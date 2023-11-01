import React from 'react';
import Image from 'next/image';
import { IPost } from '../types/recipe.interface';

const Recipe = ({ post }: { post: IPost }) => {
  return (
    <div className="max-w-2xl">
      <h1 className="recipe_title">{post.title} </h1>
      <h3 className="mt-2 text-lg">Recipe by {post?.creator?.name}</h3>
      <h3 className="mt-2 text-lg">#{post.tag}</h3>
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
      <ul>
        {post.ingredients.map((ingredient: string) => (
          <li className="mb-2 pl-5 relative">
            <span className="before:absolute before:bg-gray-500 before:w-1.5 before:h-1.5 before:rounded-full before:left-1 before:top-2.5"></span>
            {ingredient}
          </li>
        ))}
      </ul>
      <h2 className="recipe_semi-title my-10">Directions</h2>
      <ol>
        {post.steps.map((step: string, index: number) => (
          <li className="mb-10">
            {' '}
            <h4 className="recipe_step-title mb-2"> {'Step ' + (index + 1)}</h4>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;
