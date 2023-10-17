export interface IPost {
  title: string;
  text: string;
  tag: string;
  ingredients: string[];
  _id: string | undefined | null;
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
