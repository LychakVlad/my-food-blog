import React, { FC } from 'react';
import { IPost } from '../../types/recipe.interface';
import RecipeCard from '../Recipe/RecipeCard';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

interface IDataItem {
  data: IPost[];
  loading: boolean;
}

const FeedRecipeList: FC<IDataItem> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center my-10">
        <LoadingSpinner />{' '}
        <p className="text-4xl font-semibold ml-8">Loading...</p>
      </div>
    );
  }

  if (data.length !== 0) {
    return (
      <div className="mt-6 recipe_layout w-full">
        {data.map((post: IPost) => (
          <RecipeCard
            key={post._id}
            post={post}
            handleDelete={() => {}}
            handleEdit={() => {}}
          />
        ))}
      </div>
    );
  }

  return <p className="my-10 text-xl">There are no posts yet...</p>;
};

export default FeedRecipeList;
