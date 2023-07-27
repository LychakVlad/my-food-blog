'use client';

import React, { useState } from 'react';

import Form from '@components/Form';

const CreateRecipe = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    text: '',
    tag: '',
  });

  const createRecipe = async (e) => {};

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
