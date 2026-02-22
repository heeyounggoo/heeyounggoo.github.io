# CLAUDE.md — 프로젝트 하네스

## Project Overview

| Key       | Value                                |
| --------- | ------------------------------------ |
| URL       | `https://heeyounggoo.github.io`      |
| Locale    | `ko-KR`                             |
| Branch    | `master`                             |
| Framework | Astro 5 + Tailwind CSS 4 + MDX      |

개인 포트폴리오 & 기술 블로그. GitHub Pages로 배포.

---

## Tech Stack

- **Astro 5** — 정적 사이트 생성
- **Tailwind CSS 4** — `@tailwindcss/vite` 플러그인 사용 (deprecated `@astrojs/tailwind` 사용 금지)
- **MDX** — 블로그 포스트 포맷
- **TypeScript** — 타입 안전성

---

## Architecture Decisions

### Tailwind v4

Tailwind CSS 4는 Vite 플러그인을 직접 사용한다.

```ts
// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- `@astrojs/tailwind` 인테그레이션은 **사용하지 않는다** (Tailwind v3 전용, deprecated).
- CSS 파일에서 `@import "tailwindcss"` 로 로드.

### Content Collections

```ts
// content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

### Routing

| Route            | Purpose       |
| ---------------- | ------------- |
| `/`              | 포트폴리오    |
| `/blog`          | 블로그 목록   |
| `/blog/[slug]`   | 블로그 포스트 |
| `/resume`        | 이력서        |

---

## Directory Structure

```
heeyounggoo.github.io/
├── CLAUDE.md                     # 이 문서
├── astro.config.mjs
├── content.config.ts             # Content Collections 스키마
├── package.json
├── tsconfig.json
├── public/
│   ├── images/                   # 정적 이미지
│   └── fonts/                    # 커스텀 폰트 (필요시)
├── src/
│   ├── components/               # 재사용 컴포넌트
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   └── ...
│   ├── content/
│   │   └── blog/                 # MDX 블로그 포스트
│   │       └── *.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro      # 공통 레이아웃
│   │   ├── BlogLayout.astro      # 블로그 포스트 레이아웃
│   │   └── PortfolioLayout.astro # 포트폴리오 레이아웃
│   ├── pages/
│   │   ├── index.astro           # 포트폴리오 메인
│   │   ├── resume.astro          # 이력서
│   │   └── blog/
│   │       ├── index.astro       # 블로그 목록
│   │       └── [...slug].astro   # 블로그 포스트 동적 라우트
│   └── styles/
│       └── global.css            # @import "tailwindcss" + 커스텀 스타일
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions 배포
└── .claude/
    ├── settings.json             # 권한 + Hooks
    ├── settings.local.json       # 로컬 오버라이드
    ├── hooks/
    │   └── protect-files.sh      # 보호 파일 변경 차단
    ├── agents/
    │   ├── reviewer.md           # 콘텐츠 리뷰 에이전트
    │   └── builder.md            # 빌드 검증 에이전트
    ├── skills/
    │   ├── post/SKILL.md         # /post 퍼블리싱 파이프라인
    │   └── deploy/SKILL.md       # /deploy 수동 배포
    └── rules/
        └── astro.md              # Astro 코딩 규칙
```

---

## Design Tokens

| Token      | Value                  |
| ---------- | ---------------------- |
| Primary    | `#F97316` (orange-500) |
| Font       | Pretendard, system-ui  |
| Radius     | `rounded-lg` (8px)     |
| Max Width  | `max-w-4xl` (896px)    |

Pretendard 폰트 CDN:

```html
<link
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
  rel="stylesheet"
/>
```

---

## Routing Table

| Route            | File                              | Description          |
| ---------------- | --------------------------------- | -------------------- |
| `/`              | `src/pages/index.astro`           | 포트폴리오 메인      |
| `/blog`          | `src/pages/blog/index.astro`      | 블로그 목록          |
| `/blog/[slug]`   | `src/pages/blog/[...slug].astro`  | 블로그 포스트 상세   |
| `/resume`        | `src/pages/resume.astro`          | 이력서 페이지        |

---

## Content Schema

### Blog Post Frontmatter

```yaml
---
title: "포스트 제목" # 필수
date: 2026-01-01 # 필수
description: "포스트 설명" # 필수
categories: # 선택
  - JavaScript
tags: # 선택
  - react
  - typescript
image: # 선택
  src: "/images/cover.png"
  alt: "커버 이미지 설명"
draft: false # 선택 (기본: false)
---
```

### Frontmatter Template (새 포스트 작성 시)

```yaml
---
title: ""
date: YYYY-MM-DD
description: ""
categories: []
tags: []
draft: false
---
```

---

## Key Code Patterns

### 블로그 목록 페이지

```astro
---
import { getCollection } from "astro:content";
const posts = (await getCollection("blog"))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
```

### 블로그 포스트 동적 라우트

```astro
---
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
```

### 이미지 사용

```astro
---
import { Image } from "astro:assets";
import myImage from "../assets/my-image.png";
---
<Image src={myImage} alt="설명" />
```

또는 `public/images/`의 정적 이미지:

```html
<img src="/images/photo.png" alt="설명" />
```

---

## Commands

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | 개발 서버 (localhost:4321) |
| `npm run build`     | 프로덕션 빌드 (dist/)     |
| `npm run preview`   | 빌드 결과 프리뷰          |

---

## Deployment

GitHub Actions로 자동 배포. `master` 브랜치 push 시 트리거.

워크플로우: `.github/workflows/deploy.yml`

```yaml
# Astro GitHub Pages 배포
# master push → npm ci → npm run build → GitHub Pages deploy
```

---

## Agent Reference

### reviewer

- **용도**: MDX 블로그 포스트와 Astro 컴포넌트 품질 검증
- **호출**: `/post` skill Step 8에서 자동 호출
- **출력**: `PASS` / `FAIL + 사유`

### builder

- **용도**: Astro 빌드 실행 및 에러 분석
- **호출**: 빌드 검증이 필요할 때 호출
- **출력**: 빌드 성공/실패 + 에러 분석

---

## Skill Reference

### `/post`

블로그 포스트 퍼블리싱 파이프라인. 변경 감지 → frontmatter 검증 → 빌드 → 링크 검증 → Lighthouse → branch + PR → 리뷰 → 머지.

```
사용법: /post [파일경로]
예시:   /post src/content/blog/react-19.mdx
```

### `/deploy`

일반 변경사항(컴포넌트, 레이아웃, 스타일) 배포용.

```
사용법: /deploy
```

---

## Hook Behavior

### PostToolUse: Auto Format

`Edit` 또는 `Write` 도구 사용 후 `npx prettier --write`로 자동 포맷.

### PreToolUse: File Protection

`Edit` 도구 사용 전 보호 대상 파일 변경 차단:
- `CLAUDE.md`
- `.github/workflows/*`
- `package-lock.json`

---

## Resume Data

### 경력

| 회사       | 기간              | 역할              |
| ---------- | ----------------- | ----------------- |
| 라이드     | 2019.07 – 2021.07 | 프론트엔드 개발자 |
| 핏투게더   | 2021.08 – 2023.08 | 프론트엔드 개발자 |
| ANTLabs    | 2023.10 – 현재     | 프론트엔드 개발자 |

### 프로젝트

1. **모빌리티 서비스 개발** (라이드) — React, Redux, Kakao Map API
2. **디자인시스템 구축** (라이드) — React, TypeScript, Storybook, Rollup
3. **스포츠 선수 리포트 서비스** (핏투게더) — React, TypeScript, Recharts, Recoil
4. **리포트 서비스 & ANTLabs 연계** (핏투게더/ANTLabs) — React, React Query, react-window
5. **대학교 학사 시스템** (ANTLabs) — React, TypeScript, Next.js, Nx, Playwright

### 기술스택

- **Frontend**: React, TypeScript, Next.js, JavaScript, HTML/CSS, Tailwind CSS
- **State & Tools**: Redux, Recoil, Git, Figma, Storybook

### 학력

- 한국 대학교 컴퓨터공학 전공 (2015.03 – 2019.02)

---

## Migration Checklist (Jekyll → Astro)

- [ ] Astro 5 프로젝트 초기화 (`npm create astro@latest`)
- [ ] Tailwind CSS 4 + `@tailwindcss/vite` 설정
- [ ] MDX 인테그레이션 추가 (`@astrojs/mdx`)
- [ ] Content Collections 스키마 정의 (`content.config.ts`)
- [ ] 기존 블로그 포스트 MDX 변환 (`_posts/*.md` → `src/content/blog/*.mdx`)
- [ ] 이미지 마이그레이션 (`images/` → `public/images/`)
- [ ] 레이아웃 생성 (Base, Blog, Portfolio)
- [ ] 포트폴리오 메인 페이지 (`/`)
- [ ] 블로그 목록 페이지 (`/blog`)
- [ ] 블로그 포스트 동적 라우트 (`/blog/[slug]`)
- [ ] 이력서 페이지 (`/resume`) — `resume-a.html` 기반
- [ ] GitHub Actions 배포 워크플로우
- [ ] Pretendard 폰트 + 디자인 토큰 적용
- [ ] 기존 Jekyll 파일 정리 (`_config.yml`, `_layouts/`, `_includes/`, `_sass/` 등)
- [ ] 빌드 검증 + Lighthouse 점수 확인
