export interface IPost {
  title: string;
  text: string;
  tag: string;
  ingredients: string[];
  userId: string;
}

export interface IPostData extends Omit<IPost, '_id'> {}
