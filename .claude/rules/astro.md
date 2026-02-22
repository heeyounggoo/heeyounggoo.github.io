---
paths:
  - "src/**/*.astro"
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "content.config.ts"
---

# Astro 코딩 규칙

## .astro 파일 구조

Astro 컴포넌트는 frontmatter(---) 영역에 TypeScript, 하단에 템플릿을 작성한다.

```astro
---
// TypeScript 로직 (서버 사이드)
import Component from "../components/Component.astro";

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!-- 템플릿 (HTML + Astro 표현식) -->
<div class="container">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
  <Component />
</div>
```

## Props 패턴

항상 `interface Props`를 정의하고 `Astro.props`로 추출한다.

```astro
---
interface Props {
  title: string;
  href: string;
  isActive?: boolean;
}

const { title, href, isActive = false } = Astro.props;
---
```

## 클라이언트 JavaScript

클라이언트 JS가 필요한 경우에만 `client:*` 디렉티브를 사용한다.

| Directive        | 사용 시점                             |
| ---------------- | ------------------------------------- |
| `client:load`    | 즉시 필요한 인터랙션 (모달 토글 등)   |
| `client:idle`    | 페이지 로드 후 여유 시간에 (분석 등)  |
| `client:visible` | 뷰포트에 보일 때 (댓글, 하단 위젯 등) |

기본 원칙: **JavaScript 없이 가능하면 JavaScript를 쓰지 않는다.**

## Tailwind CSS

- Tailwind 유틸리티 클래스를 우선 사용한다.
- `<style>` 태그는 최소화한다 (Tailwind로 해결 불가능한 경우에만).
- 인라인 `style` 속성은 사용하지 않는다.

```astro
<!-- ✅ Good -->
<div class="max-w-4xl mx-auto px-4 py-8">

<!-- ❌ Bad -->
<div style="max-width: 896px; margin: 0 auto; padding: 32px 16px;">
```

## Content Collections

`getCollection()` 사용 시 항상 draft 필터링을 적용한다.

```ts
const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
```

정렬은 날짜 내림차순:

```ts
posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```

## 이미지

- 빌드 최적화가 필요한 이미지: `<Image>` 컴포넌트 (astro:assets)
- 정적 이미지: `public/images/` 에 배치 후 `/images/filename.png`로 참조
- 모든 이미지에 `alt` 텍스트 필수

```astro
---
import { Image } from "astro:assets";
import heroImage from "../assets/hero.png";
---

<!-- 최적화 이미지 -->
<Image src={heroImage} alt="히어로 이미지 설명" />

<!-- 정적 이미지 -->
<img src="/images/photo.png" alt="사진 설명" />
```

## TypeScript

TypeScript 컨벤션은 `.claude/rules/typescript.md` 참조.
