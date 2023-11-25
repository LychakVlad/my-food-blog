'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { IPost } from '../../types/recipe.interface';
import dateConvert from '../../utils/dateConvert';
import { Skeleton } from '@mui/material';

interface IRecipeCardData {
  post: IPost;
  handleEdit: (event: React.MouseEvent<HTMLElement>) => void;
  handleDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

const RecipeCard: FC<IRecipeCardData> = ({
  post,
  handleEdit,
  handleDelete,
}) => {
  const [loaded, setLoaded] = useState(false);
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
        <div className="relative max-w-[500px] overflow-hidden h-[300px] flex items-center">
          <Image
            alt="recipe-photo"
            src={`https://food-blog-server1.onrender.com/api${post.photo}`}
            width={500}
            height={300}
            className={`${!loaded ? 'opacity-0' : 'opacity-100'}}`}
            onLoadingComplete={() => setLoaded(true)}
          />
          {!loaded && (
            <Skeleton
              className={'bg-gray-500'}
              variant="rectangular"
              width="500px"
              height="300px"
            />
          )}
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
