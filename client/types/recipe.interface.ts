import { ReactNode } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface IPostComment {
  rating: number;
  text: string;
  creatorName: string;
  date: string;
  postId: string;
}

export interface IPost {
  title: string;
  description: string;
  tag: string;
  ingredients: string[];
  photo: string;
  steps: string[];
  _id: string | undefined | null;
  time?: ReactNode;
  comments: any;
  servings: {
    servings: any;
    yield: string;
  };
  timeToDo: { prepTime: string; cookTime: string };
  nutrition: {
    cal: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  creator:
    | {
        name: string;
        email: string;
        image: string;
        _id: string;
      }
    | undefined
    | null;
}

export interface RecipeData {
  name: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  servings: string;
  yield: string;
  prepTime: string;
  cookTime: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
  photo: string;
  tag: string;
}

export interface RecipeFormProps {
  type: string;
  onSubmit: SubmitHandler<FieldValues>;
  form: any;
}