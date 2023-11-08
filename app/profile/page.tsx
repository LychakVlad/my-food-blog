'use client';

import React, { useEffect, useState } from 'react';

import Profile from '../../components/Profile/Profile';
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

      console.log(data);

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

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
