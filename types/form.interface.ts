import { UseFormRegister } from 'react-hook-form';
import { RecipeData } from './recipe.interface';

export interface FormListProps {
  data: {
    label: string;
    description: string;
    addButton: string;
    subTitle?: string;
  };
  register: UseFormRegister<RecipeData>;
  name: string;
  control: Object;
}

export interface CustomTextAreatProps {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<RecipeData>;
}
