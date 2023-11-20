'use client';

import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../../types/recipe.interface';
import { useSession } from 'next-auth/react';
import FeedRecipeList from './FeedRecipeList';

const Feed: FC = () => {
  const [recipes, setRecipes] = useState<IPost[]>([]);
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipe`, {
          method: 'GET',
        });
        const data = await response.json();
        setRecipes(data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
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
  };

  return (
    <section className="feed mt-16">
      <form className="relative w-full  flex-col">
        <h3 className="recipe_semi-title mb-6 ">Find your favorite recipe</h3>
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
        <FeedRecipeList data={searchedResults} loading={loading} />
      ) : (
        <FeedRecipeList data={recipes} loading={loading} />
      )}
    </section>
  );
};

export default Feed;
