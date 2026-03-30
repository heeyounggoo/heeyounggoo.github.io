import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogFrontmatter } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.(mdx?|md)$/.test(f));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx?|md)$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as BlogFrontmatter,
        content,
      };
    })
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const files = fs.readdirSync(BLOG_DIR);
  const filename = files.find((f) => f.replace(/\.(mdx?|md)$/, "") === slug);
  if (!filename) return undefined;

  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}
