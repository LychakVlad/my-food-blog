'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '../../components/Form/Form';
import { IPost } from '../../types/recipe.interface';

const EditRecipe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    title: '',
    text: '',
    tag: '',
    ingredients: [],
    photo: '',
    steps: [],
    _id: null,
    creator: null,
    servings: {
      amount: '',
      yield: '',
    },
    timeToDo: {
      prep: '0',
      cook: '0',
    },
    nutrition: {
      cal: '',
      protein: '',
      carbs: '',
      fats: '',
    },
  });

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        text: data.text,
        tag: data.tag,
        steps: data.steps,
        ingredients: data.ingredients,
        photo: data.photo,
        _id: data._id,
        creator: data.creator,
        servings: {
          amount: data.servings.amount,
          yield: data.servings.yield,
        },
        timeToDo: {
          prep: data.timeToDo.prep,
          cook: data.timeToDo.cook,
        },
        nutrition: {
          cal: data.nutrition.cal,
          protein: data.nutrition.protein,
          carbs: data.nutrition.carbs,
          fats: data.nutrition.fats,
        },
      });
    };

    if (recipeId) getRecipeDetails();
  }, [recipeId]);

  const updateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (!recipeId) return alert('Recipe ID not found');

    try {
      const response = await fetch(`/api/recipe/${recipeId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: post.title,
          text: post.text,
          tag: post.tag,
          ingredients: post.ingredients,
          steps: post.steps,
          photo: post.photo,
          _id: post._id,
          creator: post.creator,
          servings: post.servings,
          timeToDo: post.timeToDo,
          nutrition: post.nutrition,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateRecipe}
    />
  );
};

export default EditRecipe;
