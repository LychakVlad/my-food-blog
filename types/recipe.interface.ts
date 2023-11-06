import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactNode } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface IPost {
  title: string;
  text: string;
  tag: string;
  ingredients: string[];
  photo: string;
  steps: string[];
  _id: string | undefined | null;
  time?: ReactNode;
  servings: { amount: string; yield: string };
  timeToDo: { prep: string; cook: string };
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
        image: string | StaticImport;
        _id: string;
      }
    | undefined
    | null;
}

export interface RecipeData {
  title: string;
  text: string;
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
}
