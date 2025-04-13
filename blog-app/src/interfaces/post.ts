import { type Author } from "./author";

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};

// export type Post = {
//   id: number;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   image?: string;
//   publishedAt: string;
//   author: Author;
// };
