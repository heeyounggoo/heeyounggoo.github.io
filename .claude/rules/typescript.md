---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "src/**/*.astro"
---

# TypeScript 컨벤션

## 타입 선언

- 함수 파라미터와 반환 타입은 명시적으로 작성 (추론에 의존 지양)
- `any` 타입 금지 — 타입 불명확 시 `unknown` 사용 후 타입 가드로 좁힘
- 객체 형태 정의: `type`보다 `interface` 선호 (Astro Props 패턴과 일관성)
- 모든 Astro 컴포넌트 Props: frontmatter 블록 내에 `interface Props`로 정의 필수

```astro
---
interface Props {
  title: string;
  description?: string;
  isActive?: boolean;
}

const { title, description, isActive = false } = Astro.props;
---
```

## Nullability 처리

- Optional chaining (`?.`)과 nullish coalescing (`??`) 우선 사용
- 기본값은 destructuring에서 직접 지정: `const { count = 0 } = Astro.props`

## Import

- 타입만 import 할 때 `import type` 사용:
  ```ts
  import type { CollectionEntry } from "astro:content";
  ```
- Astro 가상 모듈: `astro:content`, `astro:assets` (path alias 불필요)

## 금지 패턴

- `// @ts-ignore` 또는 `// @ts-nocheck` 금지
- `as unknown as X` 이중 캐스팅 금지
- 함수 파라미터 implicit `any` 금지 (명시적 타입 선언 필요)
- `any[]` 배열 타입 금지 — `unknown[]` 또는 구체적 타입 사용
