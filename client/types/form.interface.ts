import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

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
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl>;
}

export interface CustomInputProps {
  type: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  name: string;
  accept?: string;
  className?: string;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  register: UseFormRegister<FieldValues>;
  autoComplete?: string;
  required: boolean;
  id?: string;
  cytest?: string;
}
