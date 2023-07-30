'use client';

import React, { useEffect, useState } from 'react';

const RecipeCardList = ({ card, handleTagClick }) => {
  return <div className="mt-16 prompt_layout"></div>;
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const resonse = await fetch('/api/recipe');
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
