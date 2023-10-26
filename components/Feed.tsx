'use client';

import React, { FC, useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { IPost } from '../types/recipe.interface';

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

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/recipe');
      console.log(response);
      const data = await response.json();
      console.log(data);

      setPosts(data);
    };

    fetchPosts();
    console.log('posts fetched');
  }, []);
  return (
    <section className="feed">
      <RecipeCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
