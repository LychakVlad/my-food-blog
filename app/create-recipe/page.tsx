'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form/Form';
import { useSession } from 'next-auth/react';
import { FieldValues, useForm } from 'react-hook-form';

const CreateRecipe: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

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

  const createRecipe = async (data: FieldValues) => {
    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          description: data.description,
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

  return <Form type="Create" onSubmit={createRecipe} form={form} />;
};

export default CreateRecipe;
