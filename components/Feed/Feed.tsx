"use client";

import React, { FC, useMemo, useState } from "react";
import { IPost } from "../../types/recipe.interface";
import RecipeList from "../Recipe/RecipeList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "utils/consts";

const Feed: FC = () => {
  const [recipes, setRecipes] = useState<IPost[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 6;

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

  const searchedRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, recipes]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe,
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="feed mt-16">
      <form className="relative w-full  flex-col">
        <h3 className="recipe_semi-title mb-6 ">Find your favorite recipe</h3>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search recipe by title"
          className="search_input"
          id="recipe-list"
        />
      </form>

      <RecipeList
        data={currentRecipes}
        totalRecipes={searchedRecipes.length}
        loading={isLoading}
        isError={isError}
        paginate={paginate}
      />
    </section>
  );
};

export default Feed;
