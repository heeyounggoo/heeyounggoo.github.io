import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Goo Hee Young",
  description: "프론트엔드 개발 블로그",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <Link
          href="/"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-800"
        >
          &larr; Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-neutral-900">Blog</h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-neutral-500">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="text-sm text-neutral-400">
                  {new Date(post.frontmatter.date).toLocaleDateString("ko-KR")}
                </time>
                <h2 className="mt-1 text-xl font-semibold text-neutral-900 group-hover:text-orange-500 transition-colors">
                  {post.frontmatter.title}
                </h2>
                <p className="mt-1 text-neutral-600 line-clamp-2">
                  {post.frontmatter.description}
                </p>
                <div className="mt-2 flex gap-2">
                  {post.frontmatter.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs text-orange-600"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
