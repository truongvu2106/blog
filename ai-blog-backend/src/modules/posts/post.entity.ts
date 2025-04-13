export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  publishedAt: Date;
  author?: any;
}
