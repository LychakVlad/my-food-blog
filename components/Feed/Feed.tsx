'use client';

import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../../types/recipe.interface';
import { useSession } from 'next-auth/react';
import FeedRecipeList from './FeedRecipeList';

const Feed: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession();

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/recipe', { method: 'GET' });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <p>You logged in as {session?.user.name}</p>
      <FeedRecipeList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
