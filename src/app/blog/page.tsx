import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { NavHeader } from "@/components/NavHeader";

export const metadata = {
  title: "Blog | Goo Hee Young",
  description: "프론트엔드 개발 블로그",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-black">
      <NavHeader />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-12 text-3xl font-bold tracking-tighter">Blog</h1>

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
                  <h2 className="mt-1 text-xl font-semibold text-neutral-900 transition-opacity group-hover:opacity-50">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-1 text-neutral-500 line-clamp-2">
                    {post.frontmatter.description}
                  </p>
                  <div className="mt-2 flex gap-2">
                    {post.frontmatter.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-500"
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
    </div>
  );
}
