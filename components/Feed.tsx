'use client';

import React, { FC, useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { IPost } from '../types/recipe.interface';
import { useSession } from 'next-auth/react';

interface IDataItem {
  data: IPost[];
  handleTagClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const RecipeCardList: FC<IDataItem> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <RecipeCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

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

  console.log(session?.user);

  return (
    <section className="feed">
      <p>You logged in as {session?.user.name}</p>
      <RecipeCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
