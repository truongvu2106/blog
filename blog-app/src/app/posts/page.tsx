"use client";

import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { Post } from "@/interfaces/post";
import { getPosts } from "@/lib/posts";
import { useEffect, useState } from "react";

export default function Index() {
  const [heroPost, setHeroPost] = useState<Post | null>(null);
  const [morePosts, setMorePosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then((data: Post[]) => {
        data?.length > 0 && setHeroPost(data[0]);
        data?.length > 0 && setMorePosts(data.slice(1));
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main>
      <Container>
        <Intro />
        {error && <p className="text-red-500">Error: {error}</p>}
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
