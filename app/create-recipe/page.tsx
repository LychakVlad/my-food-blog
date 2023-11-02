'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form';
import { IPost } from '../../types/recipe.interface';
import { useSession } from 'next-auth/react';

const CreateRecipe: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState<IPost>({
    title: '',
    text: '',
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
    servings: {
      amount: 'e.g. 8',
      yield: 'e.g. 1 9-inch cake',
    },
    timeToDo: {
      prep: 5,
      cook: 5,
    },
    nutrition: {
      cal: '100',
      protein: '5',
      carbs: '20',
      fats: '7',
    },
    photo: '',
    tag: '',
    _id: null,
    creator: null,
  });

  const createRecipe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    console.log(post);

    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          text: post.text,
          userId: session?.user?.id,
          ingredients: post.ingredients,
          steps: post.steps,
          tag: post.tag,
          title: post.title,
          photo: post.photo,
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createRecipe}
    />
  );
};

export default CreateRecipe;
