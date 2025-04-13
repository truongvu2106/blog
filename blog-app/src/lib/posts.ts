import { ENV } from "@/config/env";
import { Post } from "@/interfaces/post";
import ApiUtils from "@/utils/api";
import { mapPost, mapPosts } from "@/utils/post.helper";

const API_URL = ENV.apiUrl;

export async function getPosts(): Promise<Post[]> {
  const res = await ApiUtils.get(`${API_URL}/posts`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json().then((data: any) => mapPosts(data || []).sort((post1, post2) => (post1.date > post2.date ? -1 : 1)));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const res = await ApiUtils.get(`${API_URL}/posts/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json().then(mapPost);
}
