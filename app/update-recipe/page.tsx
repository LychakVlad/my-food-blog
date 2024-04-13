'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '../../components/Form/Form';
import { FieldValues, useForm } from 'react-hook-form';

const EditRecipe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');

  const form = useForm<FieldValues>();

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();

      form.reset({
        title: data.title,
        description: data.description,
        tag: data.tag,
        steps: data.steps,
        ingredients: data.ingredients,
        photo: data.photo,
        _id: data._id,
        creator: data.creator,
        servings: data.servings.servings,
        yield: data.servings.yield,
        prepTime: data.timeToDo.prepTime,
        cookTime: data.timeToDo.cookTime,
        calories: data.nutrition.cal,
        protein: data.nutrition.protein,
        carbs: data.nutrition.carbs,
        fats: data.nutrition.fats,
      });
    };

    if (recipeId) getRecipeDetails();
  }, [recipeId]);

  const updateRecipe = async (data: FieldValues) => {
    if (!recipeId) return alert('Recipe ID not found');

    try {
      const response = await fetch(`/api/recipe/${recipeId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          tag: data.tag,
          steps: data.steps,
          ingredients: data.ingredients,
          photo: data.photo,
          _id: data._id,
          creator: data.creator,
          servings: {
            servings: data.servings,
            yield: data.yield,
          },
          timeToDo: {
            prepTime: data.prepTime,
            cookTime: data.cookTime,
          },
          nutrition: {
            cal: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fats: data.fats,
          },
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('Failed to update recipe', error);
    }
  };

  return <Form type="Edit" onSubmit={updateRecipe} form={form} />;
};

export default EditRecipe;
