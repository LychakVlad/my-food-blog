'use client';

import React, { use, useEffect, useState } from 'react';

import Profile from '../../components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IPost } from '../../types/recipe.interface';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, [session]);

  const handleEdit = (post: IPost) => {
    router.push(`/update-recipe?id=${post._id}`);
  };

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this recipe?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/recipe/${post?._id?.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        console.log(filteredPosts);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(session?.user);

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
