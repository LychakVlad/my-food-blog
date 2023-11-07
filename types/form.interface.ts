import { Control, FieldValues, UseFormRegister } from 'react-hook-form';

export interface FormListProps {
  data: {
    label: string;
    description: string;
    addButton: string;
    subTitle?: string;
  };
  register: UseFormRegister<FieldValues>;
  name: string;
  control: Control<FieldValues>;
}

export interface CustomTextAreatProps {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors?: any;
}

export interface CustomInputProps {
  type: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  name: string;
  accept?: string;
  className?: string;
  errors?: any;
  register: UseFormRegister<FieldValues>;
  autoComplete?: any;
  required: boolean;
  id?: string;
}
