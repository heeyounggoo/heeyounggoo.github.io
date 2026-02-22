---
paths:
  - "src/**/*.astro"
  - "src/**/*.css"
  - "src/**/*.ts"
---

# Design Tokens

| Token     | Value                  |
| --------- | ---------------------- |
| Primary   | `#F97316` (orange-500) |
| Font      | Pretendard, system-ui  |
| Radius    | `rounded-lg` (8px)     |
| Max Width | `max-w-4xl` (896px)    |

## Pretendard 폰트

CDN 로드 (BaseLayout.astro에서 적용):

```html
<link
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
  rel="stylesheet"
/>
```

## 인라인 스타일 정책

- Tailwind 유틸리티 클래스 우선 사용
- 이력서 등 복잡한 레이아웃은 `<style is:global>` 사용 허용 (Tailwind arbitrary value 남용 방지)
