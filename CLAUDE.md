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

## Architecture Decisions

@.claude/rules/project/architecture-decisions.md

---

## Directory Structure

```
heeyounggoo.github.io/
├── CLAUDE.md
├── astro.config.mjs
├── src/content.config.ts
├── package.json
├── tsconfig.json
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── content/blog/*.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── PortfolioLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── resume.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   └── styles/global.css
├── .github/
│   ├── PULL_REQUEST_TEMPLATE/
│   │   ├── blog.md
│   │   └── feature.md
│   └── workflows/
│       ├── deploy.yml
│       └── review.yml
└── .claude/
    ├── settings.json
    ├── hooks/
    │   ├── protect-files.sh
    │   └── README.md
    ├── agents/
    │   ├── reviewer.md
    │   ├── builder.md
    │   ├── requirements-analyst.md
    │   └── README.md
    ├── skills/
    │   ├── post/, feature/, deploy/
    │   ├── branch/, commit/, merge/, wrap/
    │   └── README.md
    └── rules/
        ├── astro.md, git.md, github.md, mdx.md, typescript.md
        ├── blog/
        │   ├── content-schema.md
        │   └── code-patterns.md
        └── project/
            ├── architecture-decisions.md
            ├── design-tokens.md
            └── routing-table.md
```

---

## Design Tokens

@.claude/rules/project/design-tokens.md

---

## Routing Table

@.claude/rules/project/routing-table.md

---

## Content Schema

@.claude/rules/blog/content-schema.md

---

## Key Code Patterns

@.claude/rules/blog/code-patterns.md

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

---

## Agent Reference

@.claude/agents/README.md

---

## Skill Reference

@.claude/skills/README.md

---

## Hook Behavior

@.claude/hooks/README.md
