'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import { IPost } from '../../types/recipe.interface';
import dateConvert from '../../utils/dateConvert';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Recipe = ({ post }: { post: IPost }) => {
  const data = [
    { label: 'Cook time:', value: post.timeToDo.cookTime },
    { label: 'Prep time:', value: post.timeToDo.prepTime },
    {
      label: 'Total time:',
      value: Number(post.timeToDo.cookTime) + Number(post.timeToDo.prepTime),
    },
    { label: 'Servings:', value: post.servings.amount },
    { label: 'Yield:', value: post.servings.yield },
  ];

  const nutritionData = [
    { label: 'Calories', value: post.nutrition.cal },
    { label: 'Carbs', value: post.nutrition.carbs },
    { label: 'Protein', value: post.nutrition.protein },
    { label: 'Fats', value: post.nutrition.fats },
  ];

  const [text, setText] = useState('');
  const { data: session } = useSession();

  console.log(post);

  async function submitFunc(e: any) {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-comment', {
        method: 'POST',
        body: JSON.stringify({
          creatorName: session?.user.name,
          postId: post._id,
          text: text,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="recipe_title">{post.title} </h1>
      <h3 className="mt-2 text-lg">Recipe by {post?.creator?.name}</h3>
      <p className="mt-2">Created {dateConvert(post.time)}</p>
      <h3 className="mt-2 text-lg">#{post.tag}</h3>
      <p className="desc my-10">{post.description}</p>

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
      <div className="bg-gray-200 mt-16 p-8 ">
        <div className="grid-cols-3 grid-rows-2 grid gap-8 mb-6">
          {data.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold">{item.label}</h3>
              <p>
                {item.value}
                {item.label == 'Servings:' || item.label == 'Yield:'
                  ? null
                  : ' mins'}
              </p>
            </div>
          ))}
        </div>
        <Link href="#nutrition" className=" underline">
          Show nutrition information
        </Link>
      </div>
      <h2 className="recipe_semi-title my-10">Ingredients</h2>
      <ul>
        {post.ingredients.map((ingredient: string, index: number) => (
          <li className="mb-2 pl-5 relative" key={index}>
            <span className="before:absolute before:bg-gray-500 before:w-1.5 before:h-1.5 before:rounded-full before:left-1 before:top-2.5"></span>
            {ingredient}
          </li>
        ))}
      </ul>
      <h2 className="recipe_semi-title my-10">Directions</h2>
      <ol>
        {post.steps.map((step: string, index: number) => (
          <li className="mb-10" key={index}>
            {' '}
            <h4 className="recipe_step-title mb-2"> {'Step ' + (index + 1)}</h4>
            <p>{step}</p>
          </li>
        ))}
      </ol>
      <h2 className="recipe_semi-title my-10">Nutrition</h2>
      <div className="flex justify-between items-start mb-20 " id="nutrition">
        {nutritionData.map((item, index) => (
          <div key={index} className="w-full">
            <h3 className="text-lg font-semibold">
              {item.value} {item.label !== 'Calories' ? 'g' : null}
            </h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submitFunc}>
        {' '}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="TYPE HERE"
          className="mb-10"
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Recipe;
