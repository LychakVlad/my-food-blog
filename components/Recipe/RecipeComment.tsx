import Image from 'next/image';
import React from 'react';
import RatingBar from '../UI/RatingBar/RatingBar';
import dateConvert from '../../utils/dateConvert';
import { IPostComment } from '../../types/recipe.interface';

interface RecipeCommentProps {
  item: IPostComment;
  index: number;
}

const RecipeComment = ({ item, index }: RecipeCommentProps) => {
  return (
    <div key={index} className=" border-gray-400 border mb-8 p-4">
      <div className="flex items-center mb-2">
        <div className=" overflow-hidden rounded-full w-[50px] h-[50px] relative mr-5">
          <Image
            src={'/assets/icons/profile-undefined.svg'}
            alt="user_image"
            width={50}
            height={50}
            className="absolute object-center left-0 top-0"
          />
        </div>

        <p className="text-xl">{item.creatorName}</p>
      </div>
      <RatingBar rating={item.rating} clickable={false} />
      <p className="my-2"> {dateConvert(item.date)}</p>
      <p className="text-lg">{item.text}</p>
    </div>
  );
};

export default RecipeComment;
