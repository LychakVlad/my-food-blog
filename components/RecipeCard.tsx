'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { IPost } from '../types/recipe.interface';
import Link from 'next/link';

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
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.text);
    navigator.clipboard.writeText(post.text);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <>
      {' '}
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <Link href="/recipes">View Recipe</Link>
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={
                post?.creator?.image
                  ? post.creator.image
                  : '/assets/icons/profile-undefined.svg'
              }
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post?.creator?.username ? post.creator.username : 'User name '}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post?.creator?.email ? post.creator.email : 'User email'}
              </p>
            </div>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={
                copied === post.text
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
              }
              width={12}
              height={12}
              alt="copy-btn"
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-lg font-semibold text-gray-700">
          {post.title}
        </p>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.text}</p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick}
        >
          {post.tag}
        </p>

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
