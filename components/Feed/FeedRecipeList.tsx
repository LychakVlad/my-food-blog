import React, { FC } from 'react';
import { IPost } from '../../types/recipe.interface';
import RecipeCard from '../Recipe/RecipeCard';

interface IDataItem {
  data: IPost[];
}

const FeedRecipeList: FC<IDataItem> = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <RecipeCard
          key={post._id}
          post={post}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

export default FeedRecipeList;
