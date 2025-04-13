import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { generateSlug } from 'src/utils/slug';
import { ConfigService } from '@nestjs/config';
import { PostMockData } from './post.mockdata';

@Injectable()
export class PostsService {
  constructor(private configService: ConfigService) { }

  // getDatabaseUrl(): string {
  //   return this.configService.get<string>('DATABASE_URL');
  // }

  private posts: Post[] = PostMockData;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(slug: string): Post {
    const post = this.posts.find((p) => p.slug === slug);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  create(post: Omit<Post, 'id' | 'slug'>): Post {
    const newPost: Post = {
      id: this.posts.length + 1,
      slug: generateSlug(post.title),
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(slug: string, updatedPost: Partial<Post>): Post {
    const postIndex = this.posts.findIndex((p) => p.slug === slug);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatedPost };
    return this.posts[postIndex];
  }

  delete(slug: string): void {
    const postIndex = this.posts.findIndex((p) => p.slug === slug);
    if (postIndex === -1) {
      throw new NotFoundException('Post not found');
    }
    this.posts.splice(postIndex, 1);
  }
}
