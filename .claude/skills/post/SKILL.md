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
- `date` (유효한 날짜)
- `description` (문자열, 비어있지 않음)

**선택 필드 형식:**
- `categories` — 배열
- `tags` — 배열
- `image` — 객체 (`src`, `alt` 필드)

실패 시 → 에러 출력 + 중단. 누락 필드 명시.

### Step 3: 빌드 검증

```bash
npm run build
```

- 성공 → Step 4로
- 실패 → 에러 분석 + 수정 시도 + 재빌드
- 2회 실패 → 에러 출력 + 중단

### Step 4: 링크 검증

빌드 출력(`dist/`)에서 해당 포스트의 HTML 파싱:

- **내부 링크**: `href="/..."` 대상 파일 존재 여부 확인
- **외부 링크**: HTTP HEAD 요청으로 유효성 확인 (타임아웃 5초)

```bash
# 외부 링크 확인 예시
curl -sI -m 5 -o /dev/null -w "%{http_code}" "https://example.com"
```

- 깨진 링크 발견 시 → 경고 출력 (중단하지 않음)

### Step 5: Lighthouse 검증

```bash
# 프리뷰 서버 시작 (백그라운드)
npm run preview &
PREVIEW_PID=$!
sleep 3
```

- Playwright MCP로 `http://localhost:4321` 접속
- Performance, Accessibility, Best Practices, SEO 점수 확인
- 점수 < 80이면 경고 출력

```bash
# 프리뷰 서버 종료
kill $PREVIEW_PID
```

### Step 6: Feature Branch 생성 + 커밋

```bash
# slug = MDX 파일명에서 확장자 제거
SLUG=$(basename "$MDX_FILE" .mdx)

git checkout -b "post/${SLUG}"
git add "$MDX_FILE"
# 관련 이미지 파일도 함께 staging
git add public/images/ 2>/dev/null || true
git commit -m "post: ${TITLE}"
```

### Step 7: PR 생성

```bash
git push origin "post/${SLUG}"

gh pr create \
  --title "post: ${TITLE}" \
  --body "$(cat <<EOF
## 검증 결과

- ✅ Frontmatter 검증 통과
- ✅ 빌드 성공
- ${LINK_RESULT}
- ${LIGHTHOUSE_RESULT}

### Frontmatter
- title: ${TITLE}
- date: ${DATE}
- categories: ${CATEGORIES}
- tags: ${TAGS}
EOF
)"
```

### Step 8: 리뷰 에이전트 실행

`reviewer` 에이전트에 MDX 파일 리뷰 위임:

- **PASS** → Step 9로 진행
- **FAIL** → PR에 코멘트 추가, 사용자에게 수정 요청 후 중단

```bash
# FAIL 시 PR에 코멘트
gh pr comment --body "## Review: ❌ FAIL\n\n${REVIEW_ISSUES}"
```

### Step 9: 자동 머지 + 정리

```bash
gh pr merge --squash --auto
git checkout master
git pull origin master
git branch -d "post/${SLUG}"
```

최종 출력:

```
✅ 포스트 '{TITLE}'이(가) 발행되었습니다.
GitHub Actions 배포가 시작됩니다.
URL: https://heeyounggoo.github.io/blog/${SLUG}
```
