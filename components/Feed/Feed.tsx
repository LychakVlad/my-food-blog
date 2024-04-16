"use client";

import React, { FC, useState } from "react";
import { IPost } from "../../types/recipe.interface";
import RecipeList from "../Recipe/RecipeList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "utils/consts";

const Feed: FC = () => {
  const [recipes, setRecipes] = useState<IPost[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);

  const getAllRecipes = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/recipe`);

      setRecipes(data.reverse());

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const { isError, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  const filterRecipes = (text: string) => {
    const regex = new RegExp(text, "i");
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
        <RecipeList
          data={searchedResults}
          loading={isLoading}
          isError={isError}
        />
      ) : (
        <RecipeList data={recipes} loading={isLoading} isError={isError} />
      )}
    </section>
  );
};

export default Feed;
