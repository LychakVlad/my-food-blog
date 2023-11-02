import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IPost {
  title: string;
  text: string;
  tag: string;
  ingredients: string[];
  photo: string;
  steps: string[];
  _id: string | undefined | null;
  time?: Date;
  servings: { amount: string; yield: string };
  timeToDo: { prep: number; cook: number };
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
