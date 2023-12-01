import Image from 'next/image';
import React from 'react';
import RatingBar from '../UI/RatingBar/RatingBar';
import dateConvert from '../../utils/dateConvert';
import { IPostComment } from '../../types/recipe.interface';
import userImage from '/assets/icons/profile-undefined.svg';
import deleteIcon from '/assets/icons/delete.svg';

interface RecipeCommentProps {
  item: IPostComment;
  name?: string | null | undefined;
  deleteComment: (id: string) => void;
}

//TODO fix margin bottom

const RecipeComment = ({ item, name, deleteComment }: RecipeCommentProps) => {
  return (
    <div className=" border-gray-400 border mb-8 p-4">
      <div className="flex justify-between">
        <div className="flex items-center mb-2">
          <div className=" overflow-hidden rounded-full w-[50px] h-[50px] relative mr-6">
            <Image
              src={userImage}
              alt="user_image"
              width={50}
              height={50}
              className="absolute object-center left-0 top-0"
            />
          </div>

          <p className="text-xl">{item.creatorName}</p>
        </div>
        {name === item.creatorName && (
          <Image
            src={deleteIcon}
            width={36}
            height={36}
            className="rounded-full mr-6 cursor-pointer"
            alt="close-icon"
            onClick={(e) => deleteComment(item._id)}
          />
        )}
      </div>

      <RatingBar rating={item.rating} clickable={false} />
      <p className="my-3"> {dateConvert(item.date)}</p>
      <p className="text-lg">{item.text}</p>
    </div>
  );
};

export default RecipeComment;
