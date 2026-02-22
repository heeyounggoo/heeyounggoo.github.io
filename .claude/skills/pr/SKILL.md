---
name: pr
description: PR 생성 서브스킬. 브랜치 push 후 템플릿 기반 PR을 생성한다. /post와 /feature에서 내부 호출.
allowed-tools: Bash, Read
---

# /pr — PR 생성

## 사용법

```
/pr {type} {branch} {title} [TITLE=... DATE=... URL=... BUILD_RESULT=... LINK_RESULT=...]
```

| 타입      | 템플릿                                     |
| --------- | ------------------------------------------ |
| `blog`    | `.github/PULL_REQUEST_TEMPLATE/blog.md`    |
| `feature` | `.github/PULL_REQUEST_TEMPLATE/feature.md` |

## 절차

### Step 1: Push

```bash
git push -u origin "{branch}"
```

### Step 2: 템플릿 읽기

`.github/PULL_REQUEST_TEMPLATE/{type}.md`를 Read 도구로 읽는다.

### Step 3: 변수 치환 (blog 타입만)

blog 타입인 경우 템플릿의 placeholder를 실제 값으로 치환:

| Placeholder                                          | 치환 값                         |
| ---------------------------------------------------- | ------------------------------- |
| `<!-- frontmatter의 title 값 -->`                    | `{TITLE}`                       |
| `<!-- frontmatter의 date 값 -->`                     | `{DATE}`                        |
| `<!-- https://heeyounggoo.github.io/blog/{slug} -->` | `{URL}`                         |
| `- Build:`                                           | `- Build: {BUILD_RESULT}`       |
| `- Broken links:`                                    | `- Broken links: {LINK_RESULT}` |

체크박스는 모두 `- [ ]` 유지 (리뷰어가 직접 확인).

feature 타입은 치환 없이 템플릿 그대로 사용.

### Step 4: PR 생성

```bash
gh pr create \
  --title "{title}" \
  --body "$(cat <<'EOF'
{치환된 템플릿 내용}
EOF
)" \
  --label "{type}" \
  --base master
```

### Step 5: 결과 보고

```
PR #{번호} 생성 완료: {title}
URL: {pr-url}
```

PR 번호를 호출자에게 반환.
