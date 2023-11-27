import React, { FC } from 'react';
import RecipeCard from '../Recipe/RecipeCard';
import { IPost } from '../../types/recipe.interface';
import withAuth from '../Routes/withAuth';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

//TODO fix types
interface IProfileProps {
  name: string;
  desc: string;
  data: IPost[];
  loading: boolean;
  handleEdit: any;
  handleDelete: any;
}

const Profile: FC<IProfileProps> = ({
  name,
  desc,
  data,
  loading,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {loading ? (
        <div className="flex items-center my-10">
          <LoadingSpinner />{' '}
          <p className="text-4xl font-semibold ml-8">Loading...</p>
        </div>
      ) : data.length !== 0 ? (
        <div className="mt-6 recipe_layout w-full ">
          {data.map((post: IPost) => (
            <RecipeCard
              key={post._id}
              post={post}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-xl">There are no posts yet...</p>
      )}
    </section>
  );
};

export default withAuth(Profile);
