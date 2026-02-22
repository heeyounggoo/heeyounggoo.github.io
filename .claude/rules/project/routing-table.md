---
paths:
  - "src/pages/**"
---

# Routing Table

| Route          | File                             | Description        |
| -------------- | -------------------------------- | ------------------ |
| `/`            | `src/pages/index.astro`          | 포트폴리오 메인    |
| `/blog`        | `src/pages/blog/index.astro`     | 블로그 목록        |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | 블로그 포스트 상세 |
| `/resume`      | `src/pages/resume.astro`         | 이력서 페이지      |

## 동적 라우트 슬러그

`[...slug].astro`에서 `post.id`를 slug로 사용. glob 로더가 `.mdx` 확장자를 포함하므로 `getStaticPaths()`에서 별도 처리 불필요.
