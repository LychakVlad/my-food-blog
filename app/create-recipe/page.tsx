'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '../../components/Form';
import { useSession } from 'next-auth/react';

const CreateRecipe = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: '',
    text: '',
    ingredients: [
      'e.g. 2 cups flour, sifted',
      'e.g. 1 cup sugar',
      'e.g. 2 tablespoons butter, softened',
    ],
    tag: '',
  });

  const createRecipe = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log(post.title);
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          text: post.text,
          userId: session?.user.id,
          ingredients: post.ingredients,
          tag: post.tag,
          title: post.title,
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
