'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form';
import { useSession } from 'next-auth/react';

interface RecipeData {
  text: string;
  userId: string | null | undefined;
  ingredients: string[];
  tag: string;
  title: string;
}

const CreateRecipe: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<RecipeData>({
    title: '',
    text: '',
    ingredients: [
      'e.g. 2 cups flour, sifted',
      'e.g. 1 cup sugar',
      'e.g. 2 tablespoons butter, softened',
    ],
    tag: '',
    userId: session?.user?.id,
  });
  const createRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          text: post.text,
          userId: post.userId,
          ingredients: post.ingredients,
          tag: post.tag,
          title: post.title,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
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
