---
paths:
  - "src/**"
---

# Blog Code Patterns

## 블로그 목록 페이지

```astro
---
import { getCollection } from "astro:content";
const posts = (await getCollection("blog"))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
```

## 블로그 포스트 동적 라우트

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

> `post.id`에 `.mdx` 확장자가 포함됨 — slug 파라미터로 그대로 사용

## 이미지 사용

Astro Image 컴포넌트 (최적화):

```astro
---
import { Image } from "astro:assets";
import myImage from "../assets/my-image.png";
---
<Image src={myImage} alt="설명" />
```

`public/images/` 정적 이미지:

```html
<img src="/images/photo.png" alt="설명" />
```
