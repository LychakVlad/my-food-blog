import React from 'react';
import { CustomInputProps } from '../../../types/form.interface';

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  label,
  type,
  desc,
  className,
  errors,
  name,
  register,
  autoComplete,
  required,
  accept,
  id,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        <span className="font-normal"> {desc}</span>
      </label>
      <div className="mt-2 w-full">
        <input
          {...register(name, {
            required: required ? `${name} is required` : false,
          })}
          id={id}
          type={type}
          accept={accept}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`form_input w-full  ${className} ${
            errors && 'border-red-500'
          } `}
        />
        {errors && (
          <p className="text-red-500 mt-2">{`${label} field is required`}</p>
        )}
      </div>
    </div>
  );
};

export default CustomInput;