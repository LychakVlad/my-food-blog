'use client';

import React, { useState } from 'react';

import Form from '@components/Form';

const CreateRecipe = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    text: '',
    tag: '',
  });

  const createRecipe = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          text: post.text,
          userId: session?.user.id,
          tag: post.tag,
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
      submitting={submitting}
      handleSubmit={createRecipe}
    />
  );
};

export default CreateRecipe;
