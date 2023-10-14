'use client';

import React, { FC, useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { IPost } from '../types/recipe.interface';

interface IDataItem {
  data: IPost[];
  handleTagClick: Function;
}

const RecipeCardList: FC<IDataItem> = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <RecipeCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
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
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <RecipeCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;