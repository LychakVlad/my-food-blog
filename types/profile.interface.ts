import { IPost } from "./recipe.interface";

export interface IProfileProps {
  name: string;
  desc: string;
  data: IPost[];
  totalRecipes: number;
  loading: boolean;
  isError: boolean;
  paginate: (number: number) => void;
  handleEdit: (post: IPost) => void;
  handleDelete: (post: IPost) => void;
}
