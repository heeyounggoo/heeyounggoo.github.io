import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-neutral-500 transition-colors hover:text-neutral-800"
      >
        &larr; Blog
      </Link>

      <header className="mt-6 mb-10">
        <time className="text-sm text-neutral-400">
          {new Date(post.frontmatter.date).toLocaleDateString("ko-KR")}
        </time>
        <h1 className="mt-2 text-3xl font-bold text-neutral-900">
          {post.frontmatter.title}
        </h1>
        <p className="mt-2 text-neutral-600">{post.frontmatter.description}</p>
        <div className="mt-3 flex gap-2">
          {post.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <article className="prose">
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
