import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './post.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): BlogPost[] {
    return this.postsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): BlogPost {
    return this.postsService.findOne(slug);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() postData: Omit<BlogPost, 'id' | 'slug'>): BlogPost {
    return this.postsService.create(postData);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(':slug')
  update(@Param('slug') slug: string, @Body() updateData: Partial<BlogPost>): BlogPost {
    return this.postsService.update(slug, updateData);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(':slug')
  delete(@Param('slug') slug: string): void {
    this.postsService.delete(slug);
  }
}
