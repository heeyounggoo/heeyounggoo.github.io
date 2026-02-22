## Blog Post

**Title**: <!-- frontmatter의 title 값 -->
**Date**: <!-- frontmatter의 date 값 -->
**URL**: <!-- https://heeyounggoo.github.io/blog/{slug} -->

## Checklist

### Frontmatter

- [ ] `title` — 비어있지 않음
- [ ] `date` — 유효한 YYYY-MM-DD 형식
- [ ] `description` — 160자 이하
- [ ] `categories` — 배열 형식 (존재 시)
- [ ] `tags` — lowercase kebab-case 배열 (존재 시)
- [ ] `draft: false`

### Content

- [ ] 모든 코드 블록에 언어 태그 있음
- [ ] 모든 이미지에 alt 텍스트 있음
- [ ] 내부 링크가 절대경로 (`/blog/slug`)
- [ ] 헤딩 계층이 올바름 (h2 → h3, 건너뜀 없음)
- [ ] 드래프트 텍스트 없음

### Build

- [ ] `npm run build` 성공

## Validation

<!-- /post 스킬이 자동으로 채워넣음 -->

- Build:
- Broken links:
