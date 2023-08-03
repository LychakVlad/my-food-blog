'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditRecipe = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    text: '',
    tag: '',
  });

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await fetch(`/api/recipe/${recipeId}`);
      const data = await response.json();

      setPost({
        text: data.text,
        tag: data.tag,
      });
    };

    if (recipeId) getRecipeDetails();
  }, [recipeId]);

  // const createRecipe = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);

  //   try {
  //     const response = await fetch('/api/recipe/new', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         text: post.text,
  //         userId: session?.user.id,
  //         tag: post.tag,
  //       }),
  //     });

  //     if (response.ok) {
  //       router.push('/');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={() => {}}
    />
  );
};

export default EditRecipe;
