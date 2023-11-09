'use client';

import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../../types/recipe.interface';
import { useSession } from 'next-auth/react';
import FeedRecipeList from './FeedRecipeList';

const Feed: FC = () => {
  const [recipes, setRecipes] = useState<IPost[]>([]);
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipe`, {
          method: 'GET',
        });
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, [session]);

  const filterRecipes = (text: string) => {
    const regex = new RegExp(text, 'i');
    return recipes.filter((item) => regex.test(item.title));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const searchResult = filterRecipes(e.target.value);
    setSearchedResults(searchResult);
    console.log(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search recipe by title"
          className="search_input"
          id="recipe-list"
        />
      </form>

      {searchText ? (
        <FeedRecipeList data={searchedResults} />
      ) : (
        <FeedRecipeList data={recipes} />
      )}
    </section>
  );
};

export default Feed;
