import React from 'react';
import { CustomTextAreatProps } from '../../../types/form.interface';

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
