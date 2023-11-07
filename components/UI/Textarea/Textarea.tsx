import React from 'react';
import { CustomTextAreatProps } from '../../../types/form.interface';

const Textarea = ({
  label,
  placeholder,
  register,
  name,
  required,
  errors,
}: CustomTextAreatProps) => {
  return (
    <label>
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {label}
      </span>
      <textarea
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${name} is required` : false,
        })}
        className={`form_textarea ${errors && 'border-red-500'} `}
      ></textarea>
      {errors && (
        <p className="text-red-500 mt-2">{`${label} field is required`}</p>
      )}
    </label>
  );
};

export default Textarea;
