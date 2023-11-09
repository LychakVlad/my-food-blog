'use client';

import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../../types/recipe.interface';
import { useSession } from 'next-auth/react';
import FeedRecipeList from './FeedRecipeList';

const Feed: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/recipe', { method: 'GET' });
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, [session]);

  return (
    <section className="feed">
      <FeedRecipeList data={posts} />
    </section>
  );
};

export default Feed;
