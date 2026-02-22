---
paths:
  - "**"
---

# Architecture Decisions

## Tailwind v4

Tailwind CSS 4는 `@astrojs/tailwind` 인테그레이션을 사용하지 않는다 (v3 전용, deprecated).

```ts
// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

CSS 파일에서 `@import "tailwindcss"`로 로드.

## Content Collections (Astro 5)

```ts
// src/content.config.ts
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
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- `content.config.ts`는 `src/` 안에 위치 (루트 아님)
- glob 로더는 `.mdx` 확장자 포함한 ID 반환 → slug 처리 시 주의

## Routing

| Route          | Purpose       |
| -------------- | ------------- |
| `/`            | 포트폴리오    |
| `/blog`        | 블로그 목록   |
| `/blog/[slug]` | 블로그 포스트 |
| `/resume`      | 이력서        |
