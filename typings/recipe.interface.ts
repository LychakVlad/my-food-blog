export interface IPost {
  title: string;
  text: string;
  tag: string;
  _id: string;
  creator: string;
}

export interface IPostData extends Omit<IPost, '_id'> {}
