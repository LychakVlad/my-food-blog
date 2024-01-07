'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form/Form';
import { useSession } from 'next-auth/react';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';

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

  const fetchProcessedBase64 = async (imageUrl: string) => {
    try {
      const response = await fetch(`/api/image-process?imageUrl=${imageUrl}`);
      const data = await response.json();

      return data.base64;
    } catch (error) {
      console.log('Failed to fetch processed image', error);
    }
  };

  async function loadImageBase64(imageLink: string) {
    try {
      const base64 = await fetchProcessedBase64(
        `${process.env.NEXT_PUBLIC_SERVER_URL}${imageLink}`
      );

      return base64;
    } catch (error) {
      console.log('Failed to load base64 image', error);
    }
  }

  async function postImage(image: any) {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/images`,
        formData,
        {
          headers: { 'content-type': 'multipart/form-data' },
        }
      );

      return result.data;
    } catch (error) {
      console.log('Failed to post image', error);
    }
  }

  const createRecipe = async (data: FieldValues) => {
    try {
      let imageLink = null;
      let imageBase64 = null;

      if (data.photo && data.photo[0]) {
        imageLink = await postImage(data.photo[0]);
        imageBase64 = await loadImageBase64(imageLink.imagePath);
        console.log(imageBase64);
      }

      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          description: data.description,
          userId: session?.user?.id,
          ingredients: data.ingredients,
          steps: data.steps,
          tag: data.tag,
          title: data.title,
          photo: {
            imageLink: imageLink?.imagePath,
            base64: imageBase64,
          },
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
      console.log('Failed to create recipe', error);
    }
  };

  return <Form type="Create" onSubmit={createRecipe} form={form} />;
};

export default CreateRecipe;
