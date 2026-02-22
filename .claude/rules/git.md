---
paths:
  - "**"
---

# Git 컨벤션

## 브랜치 명명 규칙

| 타입          | 형식                      | 예시                    |
| ------------- | ------------------------- | ----------------------- |
| 블로그 포스트 | `blog-{yyyy-mm-dd}`       | `blog-2026-02-22`       |
| Feature       | `feature/{kebab-summary}` | `feature/add-dark-mode` |
| 버그 수정     | `fix/{kebab-description}` | `fix/broken-links`      |

- 항상 `master`에서 브랜치 생성 (다른 feature 브랜치에서 생성 금지)
- feature/fix 브랜치 summary: 2-5 단어, kebab-case

## 커밋 메시지 형식

```
{type}: {description}
```

최대 72자. 마침표 없음. 한국어 description 허용.

### 커밋 타입

| 타입       | 사용 시점                     |
| ---------- | ----------------------------- |
| `blog`     | 블로그 포스트 신규/수정       |
| `feat`     | 신규 기능/컴포넌트            |
| `fix`      | 버그 수정                     |
| `style`    | CSS/Tailwind 전용 변경        |
| `refactor` | 동작 변경 없는 코드 구조 개선 |
| `chore`    | 설정, 툴링, src 외 변경       |
| `docs`     | 문서만 변경                   |

### 블로그 커밋 예시

```
blog: new-{slug}       # 새 포스트 (slug = 파일명에서 .mdx 제거)
blog: update-{slug}    # 기존 포스트 수정
```

### Feature 커밋 예시 (단계별)

```
feat: add PostCard component
feat: implement category filter
```

## 규칙

- `git add -A` 또는 `git add .` 금지 — 관련 파일만 명시적으로 스테이징
- 스테이징 전 `git diff --cached` 확인 습관화
