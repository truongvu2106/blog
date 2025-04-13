import { Post } from "@/interfaces/post";

export function mapPost(data: any): Post {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.image, // Optional
    date: data.publishedAt, // Date
    author: data.author,
    ogImage: {
      url: data.image,
    },
  };
}

export function mapPosts(data: any[]): Post[] {
  return (data || []).map(mapPost);
}
