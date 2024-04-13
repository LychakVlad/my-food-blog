import { IPost } from "./recipe.interface";

export interface IProfileProps {
  name: string;
  desc: string;
  data: IPost[];
  loading: boolean;
  handleEdit: (post: IPost) => void;
  handleDelete: (post: IPost) => void;
}
