---
paths:
  - "**"
---

# GitHub 컨벤션

## PR 제목 형식

커밋 메시지와 동일한 형식: `{type}: {description}`

```
blog: Set Methods 사용해도 될까?    # 블로그 → 포스트 제목 그대로 사용
feat: add PostCard with category filter
fix: correct broken internal links
```

## PR 템플릿 선택

| PR 타입       | 템플릿 파일                                |
| ------------- | ------------------------------------------ |
| 블로그 포스트 | `.github/PULL_REQUEST_TEMPLATE/blog.md`    |
| Feature/Fix   | `.github/PULL_REQUEST_TEMPLATE/feature.md` |

`gh pr create` 시 `--template` 플래그로 지정:

```bash
gh pr create --template blog.md ...
gh pr create --template feature.md ...
```

## 브랜치 라이프사이클

1. 항상 master 최신화 후 브랜치 생성 (`git checkout master && git pull`)
2. 첫 push 시 `-u` 플래그: `git push -u origin {branch}`
3. 머지 후: remote 삭제 (`gh pr merge --delete-branch`) + local 삭제 (`git branch -d {branch}`)
4. 머지 후 항상 master pull: `git pull origin master`

## 머지 전략

- 모든 PR: **squash merge** (`gh pr merge --squash --delete-branch`)
- 로컬 머지 금지 — gh CLI 통해서만
- `review.yml` 체크 통과 후 머지

## 보호 정책

- master 직접 push 금지 (`/deploy` 스킬 예외)
- force push 금지
- `--no-verify` 금지
