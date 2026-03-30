export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  categories: string[];
  tags: string[];
  image?: {
    src: string;
    alt: string;
  };
  draft: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
