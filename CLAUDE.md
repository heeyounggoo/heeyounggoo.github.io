# CLAUDE.md — 프로젝트 하네스

## Project Overview

| Key       | Value                           |
| --------- | ------------------------------- |
| URL       | `https://heeyounggoo.github.io` |
| Locale    | `ko-KR`                         |
| Branch    | `master`                        |
| Framework | Astro 5 + Tailwind CSS 4 + MDX  |

개인 포트폴리오 & 기술 블로그. GitHub Pages로 배포.

---

## Tech Stack

- **Astro 5** — 정적 사이트 생성
- **Tailwind CSS 4** — `@tailwindcss/vite` 플러그인 사용 (deprecated `@astrojs/tailwind` 사용 금지)
- **MDX** — 블로그 포스트 포맷
- **TypeScript** — 타입 안전성

---

## Commands

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | 개발 서버 (localhost:4321) |
| `npm run build`   | 프로덕션 빌드 (dist/)      |
| `npm run preview` | 빌드 결과 프리뷰           |

---

## Deployment

GitHub Actions로 자동 배포. `master` 브랜치 push 시 트리거.

워크플로우: `.github/workflows/deploy.yml`

