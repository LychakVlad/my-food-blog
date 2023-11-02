'use client';

import Image from 'next/image';
import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { IPost } from '../types/recipe.interface';
import dateConvert from '../utils/dateConvert';

interface IRecipeCardData {
  post: IPost;
  handleTagClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleEdit: (event: React.MouseEvent<HTMLElement>) => void;
  handleDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

const RecipeCard: FC<IRecipeCardData> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  function handleClick() {
    router.push(`/recipes/${post._id}`);
  }

  return (
    <>
      {' '}
      <div className="recipe_card">
        <div className="relative  max-w-[300px] overflow-hidden h-[300px] flex items-center ">
          {' '}
          <Image
            src={'/assets/images/recipe-photo.jpeg'}
            alt="user_image"
            width={400}
            height={40}
            className="object-cover object-center  absolute"
          />
        </div>

        <p className="mt-4 font-satoshi text-3xl font-semibold text-gray-700">
          {post.title}
        </p>
        <p className="font-inter text-lg mt-1 mb-4">#{post.tag}</p>

        <button className="outline_btn" onClick={handleClick}>
          Go to recipe
        </button>

        <div className="flex-1 flex justify-start items-center gap-3 mt-4">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.name ? post.creator.name : 'User name '}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.time ? dateConvert(post.time) : 'Time created'}
            </p>
          </div>
        </div>

        {session?.user?.id === post.creator?._id && pathName === '/profile' && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeCard;
