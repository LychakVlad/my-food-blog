"use client";

import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IPost } from "../../types/recipe.interface";
import dateConvert from "../../utils/dateConvert";
import Image from "next/image";
import useSWR from "swr";

interface IRecipeCardData {
  post: IPost;
  handleEdit: (post: IPost) => void;
  handleDelete: (post: IPost) => void;
}

const RecipeCard: FC<IRecipeCardData> = ({
  post,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [base64Image, setBase64Image] = useState(
    post.photo.base64
      ? post.photo.base64
      : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
  );

  const fetcher = (path: string) => fetch(path).then((res) => res.json());

  const S3Image = ({ Key }: { Key: string }) => {
    const { data } = useSWR<{ src: string }>(`/api/s3-bucket/${Key}`, fetcher);
    const picture =
      data?.src ||
      post.photo.base64 ||
      "https://placehold.co/330x300/png?text=Picture";
    return (
      <Image
        alt="recipe-photo"
        src={picture}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={base64Image}
      />
    );
  };

  function handleClick() {
    router.push(`/recipes/${post._id}`);
  }

  return (
    <>
      <div className="recipe_card" data-cy={`test-recipe-card-${post.title}`}>
        <div className="relative max-w-[330px] overflow-hidden h-[300px] flex items-center">
          <S3Image Key={post.photo.imageLink} />
        </div>

        <p className="mt-4 font-satoshi text-3xl font-semibold text-gray-700">
          {post.title}
        </p>
        <p className="font-inter text-lg mt-1 mb-4">#{post.tag}</p>

        <button
          className="outline_btn"
          onClick={handleClick}
          data-cy={`go-to-recipe-btn-${post.title}`}
        >
          Go to recipe
        </button>

        <div className="flex-1 flex justify-start items-center gap-3 mt-4">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.name ? post.creator.name : "User name "}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.time ? dateConvert(post.time) : "Time created"}
            </p>
          </div>
        </div>

        {session?.user?.id === post.creator?._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => handleEdit(post)}
              data-cy={`edit-recipe-btn-${post.title}`}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => handleDelete(post)}
              data-cy={`delete-recipe-btn-${post.title}`}
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
