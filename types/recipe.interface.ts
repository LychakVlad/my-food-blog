import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IPost {
  title: string;
  text: string;
  tag: string;
  ingredients: string[];
  photo: string;
  steps: string[];
  _id: string | undefined | null;
  creator:
    | {
        username: string;
        email: string;
        image: string | StaticImport;
        _id: string;
      }
    | undefined
    | null;
}
