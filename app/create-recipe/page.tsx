'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form/Form';
import { useSession } from 'next-auth/react';
import { FieldValues } from 'react-hook-form';

const CreateRecipe: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const createRecipe = async (data: FieldValues) => {
    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          text: data.text,
          userId: session?.user?.id,
          ingredients: data.ingredients,
          steps: data.steps,
          tag: data.tag,
          title: data.title,
          photo: data.photo,
          servings: {
            amount: data.servings,
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
      console.log(error);
    }
  };

  return <Form type="Create" onSubmit={createRecipe} />;
};

export default CreateRecipe;
