import React from 'react';
import Image from 'next/image';

const Recipe = ({ post }) => {
  return (
    <div>
      <h3>{post.creator.username}</h3>
      <h3>{post.creator.email}</h3>
      <Image
        src={
          post?.creator?.image
            ? post.creator.image
            : '/assets/icons/profile-undefined.svg'
        }
        alt="user_image"
        width={60}
        height={60}
        className="rounded-full object-contain"
      />
      <h1>Title: {post.title} </h1>
      <h2>Text: {post.text}</h2>
      <h2>Ingredients</h2>
      <p>
        {post.ingredients.map((ingredient: string) => (
          <p>{ingredient}</p>
        ))}
      </p>
      <h2>Steps</h2>
      <p>
        {post.steps.map((step: string) => (
          <p>{step}</p>
        ))}
      </p>
      <p>#{post.tag}</p>
    </div>
  );
};

export default Recipe;
