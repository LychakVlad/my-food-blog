import React from 'react';
import Image from 'next/image';
import { IPost } from '../types/recipe.interface';

const Recipe = ({ post }: { post: IPost }) => {
  return (
    <div className="max-w-2xl">
      <h1 className="recipe_title">{post.title} </h1>
      <p className="desc my-10">{post.text}</p>

      <div className="relative  max-w-[672px] overflow-hidden h-[500px] flex items-center ">
        {' '}
        <Image
          src={'/assets/images/recipe-photo.jpeg'}
          alt="food_image"
          width={672}
          height={500}
          className="object-cover object-center  absolute"
        />
      </div>
      <h2 className="recipe_semi-title my-10">Ingredients</h2>
      <p>
        {post.ingredients.map((ingredient: string, index: number) => (
          <span>{ingredient}</span>
        ))}
      </p>
      <h2 className="recipe_semi-title my-10">Directions</h2>

      {post.steps.map((step: string, index: number) => (
        <div className="mb-10">
          <h4 className="recipe_step-title mb-2"> {'Step ' + (index + 1)}</h4>

          <p>{step}</p>
        </div>
      ))}

      <p>#{post.tag}</p>
      <h3>{post?.creator?.username}</h3>
      <Image
        src={
          post?.creator?.image
            ? post.creator.image
            : '/assets/icons/profile-undefined.svg'
        }
        alt="user_image"
        width={60}
        height={60}
        className="rounded-full object-contain"
      />
    </div>
  );
};

export default Recipe;
