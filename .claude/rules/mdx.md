---
paths:
  - "src/content/blog/**/*.mdx"
---

# MDX 작성 규칙

## Frontmatter

### 필수 필드

```yaml
title: "포스트 제목" # 비어있으면 안 됨
date: 2026-02-22 # ISO 8601 (YYYY-MM-DD)
description: "1-2문장 요약" # SEO용, 160자 이하
```

### 선택 필드

```yaml
categories: # Title Case 배열
  - JavaScript
  - TypeScript
tags: # lowercase kebab-case 배열
  - react-hooks
  - use-effect
image:
  src: "/images/cover.png" # public/ 기준 절대경로
  alt: "커버 이미지 설명"
draft: false # 배포 시 반드시 false (기본값, 생략 가능)
```

## 코드 블록

- 언어 태그 **항상** 명시 (` ```js `, ` ```ts `, ` ```astro `, ` ```bash `, ` ```yaml ` 등)
- 빈 코드 블록 금지
- 셸 명령어: ` ```bash ` 사용 (` ```shell `, ` ```sh ` 지양)

## 이미지

- 모든 이미지에 의미 있는 `alt` 텍스트 필수 (빈 문자열 또는 "image" 금지)
- 정적 이미지 경로: `src="/images/filename.ext"` (절대경로, `public/` 기준)
- 인라인 style 금지 — `global.css`의 `.prose img` 스타일 활용

## 링크

- 내부 링크: **절대경로** 필수 (`/blog/slug`, `/resume`)
- 상대경로 링크 금지 (`../other-post` 형태 금지)
- 외부 링크: `https://` 포함 전체 URL 사용

## 콘텐츠 구조

- 포스트 최상위 헤딩은 `##` (h2) — frontmatter `title`이 h1 역할
- 헤딩 계층 건너뜀 금지 (h2 → h4 불가, h2 → h3 → h4 순서 준수)
- 의미 있는 링크 텍스트 ("여기를 클릭하세요", "click here" 금지)
- 링크에 semantic 의미 부여

## 한국어 작성 가이드

- 존댓말 또는 반말 중 하나를 선택해 전체 포스트에서 일관성 유지 (혼용 금지)
- 기술 용어 영어 그대로 사용 (React, TypeScript, API 등)
- 코드 내 변수명/함수명은 항상 영어
