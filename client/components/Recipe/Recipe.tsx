'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IPost, IPostComment } from '../../types/recipe.interface';
import dateConvert from '../../utils/dateConvert';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import RatingBar from '../UI/RatingBar/RatingBar';
import RatingDescription from '../UI/RatingBar/RatingDescription';
import RecipeComment from './RecipeComment';
import Textarea from '../UI/Textarea/Textarea';
import { FieldValues, useForm } from 'react-hook-form';

const Recipe = ({ post }: { post: IPost }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [postComment, setPostComment] = useState(post.comments);

  const [imageSrc, setImageSrc] = useState(
    post.photo.imageLink
      ? `${process.env.NEXT_PUBLIC_SERVER_URL}${post.photo.imageLink}`
      : 'https://placehold.co/600x900/png?text=Picture'
  );
  const [base64Image, setBase64Image] = useState(
    post.photo.base64
      ? post.photo.base64
      : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  );

  const data = [
    { label: 'Cook time:', value: post.timeToDo.cookTime },
    { label: 'Prep time:', value: post.timeToDo.prepTime },
    {
      label: 'Total time:',
      value: Number(post.timeToDo.cookTime) + Number(post.timeToDo.prepTime),
    },
    { label: 'Servings:', value: post.servings.servings },
    { label: 'Yield:', value: post.servings.yield },
  ];

  const nutritionData = [
    { label: 'Calories', value: post.nutrition.cal },
    { label: 'Carbs', value: post.nutrition.carbs },
    { label: 'Protein', value: post.nutrition.protein },
    { label: 'Fats', value: post.nutrition.fats },
  ];

  const { data: session } = useSession();
  const [rating, setRating] = useState(3);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  async function submitFunc(data: FieldValues) {
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          creatorName: session?.user.name,
          postId: post._id,
          text: data.review,
          rating: rating,
        }),
      });

      const newComment = await response.json();

      setPostComment((prevComments) => [...prevComments, newComment]);

      reset();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteComment(id: string) {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this comment?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/comment`, {
          method: 'DELETE',
          body: JSON.stringify({
            id: id,
            postId: post._id,
          }),
        });

        const newCommentArray = postComment.filter((item) => item._id !== id);

        setPostComment(newCommentArray);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="recipe_title">{post.title} </h1>
      <h3 className="mt-2 text-lg">Recipe by {post?.creator?.name}</h3>
      <p className="mt-2">Created {dateConvert(post.time)}</p>
      <h3 className="mt-2 text-lg">#{post.tag}</h3>
      <p className="desc mt-10 mb-4">{post.description}</p>{' '}
      <div className="relative w-full max-h-[900px] max-w-[600px]">
        <Image
          src={imageSrc}
          alt="food_image"
          placeholder="blur"
          className="object-cover"
          blurDataURL={base64Image}
          width={600}
          height={900}
          onError={() =>
            setImageSrc('https://placehold.co/600x900/png?text=Picture')
          }
        />
      </div>
      <div className="bg-gray-200 mt-10 p-8 ">
        <div className="sm:grid-cols-3 sm:grid-rows-2 grid gap-8 mb-6 ">
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
      <div className="bg-gray-200 p-8 mb-16">
        {session?.user ? (
          <form
            onSubmit={handleSubmit(submitFunc)}
            className="flex gap-10 flex-col"
          >
            <Textarea
              placeholder="Your review..."
              register={register}
              label="Review"
              name="review"
              required={true}
              errors={errors.review}
              cytest="comment-cy-text"
            />
            <div className="sm:flex sm:flex-row flex-col items-center gap-8">
              <RatingBar
                rating={rating}
                handleClick={handleRatingClick}
                clickable={true}
              />
              <div className=" text-xl mt-6 ml-2 sm:mt-0 sm:ml-0">
                {<RatingDescription rating={rating} />}
              </div>
            </div>

            <button
              type="submit"
              className="outline_btn ml-2 max-w-[100px]"
              disabled={isSubmitting}
              data-cy="submit-comment-btn"
            >
              Send
            </button>
          </form>
        ) : (
          <div data-cy="login-or-signup-required">
            Please{' '}
            <Link href={'/login'} className="underline">
              log in
            </Link>{' '}
            or{' '}
            <Link href={'/sign-up'} className="underline">
              sign up
            </Link>{' '}
            to leave a comments!
          </div>
        )}
      </div>
      {postComment.map((item: IPostComment, index: number) => (
        <RecipeComment
          item={item}
          key={index}
          name={session?.user.name}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default Recipe;
