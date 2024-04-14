"use client";

import React, { useEffect, useState } from "react";

import Profile from "../../components/Profile/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IPost } from "../../types/recipe.interface";
import axios from "axios";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post: IPost) => {
    router.push(`/update-recipe?id=${post._id}`);
  };

  async function deleteImage(id: string) {
    try {
      const result = await axios.delete(`/api/s3-bucket/${id}`);
      return result.data;
    } catch (error) {
      console.log("Failed to delete image", error);
    }
  }

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/recipe/${post?._id?.toString()}`, {
          method: "DELETE",
        });

        {
          post.photo.imageLink ? await deleteImage(post.photo.imageLink) : null;
        }

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log("Failed to delete recipe", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your profile page"
      loading={loading}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
