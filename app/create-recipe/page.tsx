'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form';
import { useSession } from 'next-auth/react';
import { IPost } from '../../types/recipe.interface';

const CreateRecipe: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  let userId: string = session?.user?.id ?? '';

  const [post, setPost] = useState<IPost>({
    title: '',
    text: '',
    ingredients: [
      'e.g. 2 cups flour, sifted',
      'e.g. 1 cup sugar',
      'e.g. 2 tablespoons butter, softened',
    ],
    tag: '',
    userId: userId,
  });
  console.log(post.userId);

  const createRecipe = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);

    console.log(post.userId);

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
