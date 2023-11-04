import React, { FC } from 'react';
import { IPost } from '../../types/recipe.interface';
import RecipeCard from '../Recipe/RecipeCard';

interface IDataItem {
  data: IPost[];
  handleTagClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const FeedRecipeList: FC<IDataItem> = ({ data, handleTagClick }) => {
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

export default FeedRecipeList;
