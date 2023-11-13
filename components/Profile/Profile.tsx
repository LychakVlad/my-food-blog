import React, { FC } from 'react';
import RecipeCard from '../Recipe/RecipeCard';
import { IPost } from '../../types/recipe.interface';
import withAuth from '../Routes/withAuth';

interface IProfileProps {
  name: string;
  desc: string;
  data: IPost[];
  handleEdit: (post: IPost) => void;
  handleDelete: (post: IPost) => void;
}

const Profile: FC<IProfileProps> = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 recipe_layout">
        {data.map((post: IPost) => (
          <RecipeCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default withAuth(Profile);
