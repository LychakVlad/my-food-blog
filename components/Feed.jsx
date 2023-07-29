'use client';

import React, { useState } from 'react';

const RecipeCardList = ({ card, handleTagClick }) => {
  return <div className="mt-16 prompt_layout"></div>;
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {};
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
      <RecipeCardList data={[]} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
