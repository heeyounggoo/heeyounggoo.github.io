# CLAUDE.md

개인 포트폴리오 & 기술 블로그 (`https://heeyounggoo.github.io`). GitHub Pages 배포.

## Tech Stack

Astro 5 + Tailwind CSS 4 (`@tailwindcss/vite`) + MDX + TypeScript

- `@astrojs/tailwind` 사용 금지 (deprecated)

## Commands

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | 개발 서버 (localhost:4321) |
| `npm run build`   | 프로덕션 빌드 (dist/)      |
| `npm run preview` | 빌드 결과 프리뷰           |

## Deployment

GitHub Actions 자동 배포. `master` push 시 트리거. (`.github/workflows/deploy.yml`)

## Rules

- 이력서(`resumeData.ts`) 수정 시 em dash(`—`) 패턴을 사용하지 않는다.
- 커밋 메시지에 `Co-Authored-By` 줄을 포함하지 않는다.
