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
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<IPost[]>([]);

  const handleSearchChange = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/recipe');
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <RecipeCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
