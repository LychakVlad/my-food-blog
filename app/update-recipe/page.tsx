'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '../../components/Form/Form';
import { FieldValues, useForm } from 'react-hook-form';

const EditRecipe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');

  const form = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      ingredients: [
        'e.g. 2 cups flour, sifted',
        'e.g. 1 cup sugar',
        'e.g. 2 tablespoons butter, softened',
      ],
      steps: [
        'e.g. Preheat oven to 350 degrees F…',
        'e.g. Combine all dry ingredients in a large bowl…',
        'e.g. Pour into greased trays and bake for 15-20 minutes…',
      ],
      servings: '8',
      yield: 'e.g. 1 9-inch cake',
      prepTime: '5',
      cookTime: '5',
      calories: '100',
      protein: '5',
      carbs: '20',
      fats: '7',
      photo: '',
      tag: '',
    },
  });

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();

      console.log(data);

      form.reset({
        title: data.title,
        description: data.description,
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
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Form type="Edit" onSubmit={updateRecipe} form={form} />;
};

export default EditRecipe;
