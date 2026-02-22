---
paths:
  - "src/content/**"
  - "*.mdx"
---

# Blog Content Schema

## Frontmatter 필수 필드

| 필드          | 타입               | 설명        |
| ------------- | ------------------ | ----------- |
| `title`       | string             | 포스트 제목 |
| `date`        | YYYY-MM-DD         | 발행일      |
| `description` | string, 160자 이하 | SEO 설명    |

## Frontmatter 선택 필드

| 필드         | 타입                           | 설명          |
| ------------ | ------------------------------ | ------------- |
| `categories` | string[]                       | 카테고리 배열 |
| `tags`       | string[]                       | 태그 배열     |
| `image`      | `{ src: string, alt: string }` | 커버 이미지   |
| `draft`      | boolean (기본: false)          | 초안 여부     |

## 포스트 Frontmatter 예시

```yaml
---
title: "포스트 제목"
date: 2026-01-01
description: "포스트 설명"
categories:
  - JavaScript
tags:
  - react
  - typescript
image:
  src: "/images/cover.png"
  alt: "커버 이미지 설명"
draft: false
---
```

## 새 포스트 템플릿

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

## 규칙

- `draft: true`인 포스트는 빌드에서 필터링됨 — 배포 전 반드시 `false`로 변경
- `description`은 160자 이하 권장 (SEO 최적화)
- `date`는 `YYYY-MM-DD` 형식 엄수
