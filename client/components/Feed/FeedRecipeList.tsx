import React, { FC } from 'react';
import { IPost } from '../../types/recipe.interface';
import RecipeCard from '../Recipe/RecipeCard';

interface IDataItem {
  data: IPost[];
  loading: boolean;
}

const FeedRecipeList: FC<IDataItem> = ({ data, loading }) => {
  return (
    <div className="mt-6 recipe_layout w-full ">
      {loading ? (
        <p>Loading...</p>
      ) : data.length !== 0 ? (
        data.map((post: IPost) => (
          <RecipeCard
            key={post._id}
            post={post}
            handleDelete={() => {}}
            handleEdit={() => {}}
          />
        ))
      ) : (
        <p>There is no posts yet...</p>
      )}
    </div>
  );
};

export default FeedRecipeList;
