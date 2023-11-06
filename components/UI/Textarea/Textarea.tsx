import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CustomTextAreatProps {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}

const Textarea = ({
  label,
  placeholder,
  register,
  name,
}: CustomTextAreatProps) => {
  return (
    <label>
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {label}
      </span>
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className={`form_textarea `}
      ></textarea>
    </label>
  );
};

export default Textarea;
