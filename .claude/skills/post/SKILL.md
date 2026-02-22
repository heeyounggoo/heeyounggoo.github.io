---
name: post
description: 블로그 포스트 검증 → PR 생성 → 리뷰 → 자동 머지 → 배포
allowed-tools: Bash, Read, Glob, Grep, Task
---

# /post — 블로그 포스트 퍼블리싱 파이프라인

사용자가 MDX 포스트 작성 후 `/post` 실행 시 전체 파이프라인을 수행한다.

## 사용법

```
/post                              # git diff로 변경된 MDX 자동 감지
/post src/content/blog/my-post.mdx # 특정 파일 지정
```

## 파이프라인

### Step 1: 변경 감지

```bash
git diff --name-only HEAD
git diff --name-only --cached
git ls-files --others --exclude-standard
```

- `$ARGUMENTS`가 있으면 해당 파일을 대상으로 지정
- 없으면 위 명령으로 새로/수정된 `.mdx` 파일 탐지
- MDX 파일이 없으면 에러 출력 + 중단

### Step 2: Frontmatter 검증

대상 MDX 파일을 읽고 frontmatter 검증:

**필수 필드:**

- `title` (문자열, 비어있지 않음)
- `date` (유효한 YYYY-MM-DD 날짜)
- `description` (문자열, 비어있지 않음, 160자 이하)

**선택 필드 형식:**

- `categories` — 배열
- `tags` — 배열
- `image` — 객체 (`src`, `alt` 필드)

실패 시 → 에러 출력 + 중단. 누락 필드 명시.

### Step 3: 빌드 검증 (builder agent 위임)

```
Task → builder agent: "빌드를 실행하고 결과를 보고하세요."
```

- PASS → Step 4로
- FAIL → 에러 출력 + 중단

### Step 4: 링크 검증

빌드 출력(`dist/`)에서 해당 포스트의 HTML 파싱:

- **내부 링크**: `href="/..."` 대상 파일 존재 여부 확인
- **외부 링크**: HTTP HEAD 요청으로 유효성 확인 (타임아웃 5초)

```bash
curl -sI -m 5 -o /dev/null -w "%{http_code}" "https://example.com"
```

깨진 링크 발견 시 → 경고 출력 (중단하지 않음, LINK_RESULT에 기록)

### Step 5: 커밋 타입 결정

```bash
SLUG=$(basename "$MDX_FILE" .mdx)
DATE=$(grep '^date:' "$MDX_FILE" | head -1 | sed 's/date: *//')
TITLE=$(grep '^title:' "$MDX_FILE" | head -1 | sed 's/title: *//' | tr -d '"')
```

기존 포스트 여부 확인:

```bash
git log --oneline -- "$MDX_FILE"
```

- 결과 있음 → `COMMIT_TYPE="update"`
- 결과 없음 → `COMMIT_TYPE="new"`

### Step 6: 브랜치 생성 (서브스킬 위임)

```
Skill → /branch: "blog {DATE}"
```

생성 브랜치: `blog-{yyyy-mm-dd}`

### Step 7: 스테이징 + 커밋 (서브스킬 위임)

```bash
git add "$MDX_FILE"
git add public/images/ 2>/dev/null || true
```

```
Skill → /commit: "blog: {COMMIT_TYPE}-{SLUG}"
```

### Step 8: PR 생성 (서브스킬 위임)

```
Skill → /pr: "blog blog-{DATE} \"blog: {TITLE}\" TITLE={TITLE} DATE={DATE} URL=https://heeyounggoo.github.io/blog/{SLUG} BUILD_RESULT=✅ 성공 LINK_RESULT={LINK_RESULT}"
```

PR 번호 저장: `PR_NUMBER`

### Step 9: 머지 (서브스킬 위임)

```
Skill → /merge: "{PR_NUMBER} blog-{DATE} https://heeyounggoo.github.io/blog/{SLUG}"
```

`/merge`가 `review.yml` 체크 통과 대기 후 squash merge 수행.
