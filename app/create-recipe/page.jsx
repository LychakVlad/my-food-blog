'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';

const CreateRecipe = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: '',
    text: '',
    tag: '',
  });

  const createRecipe = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(post);

    try {
      console.log(post.title);
      const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify({
          text: post.text,
          userId: session?.user.id,
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
