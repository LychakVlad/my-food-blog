import React, { ChangeEventHandler, FC } from 'react';

interface CustomInputProps {
  value: string | number;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  desc?: string;
  name?: string;
  id?: string;
  accept?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
}

const CustomInput = ({
  value,
  onChange,
  placeholder,
  label,
  type,
  desc,
  required,
  className,
  error,
}: CustomInputProps) => {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700 ">
        {label}
      </span>
      <span className="font-normal"> {desc}</span>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`form_input  ${className} ${
          error ? null : ' border-red-400'
        }`}
      />
      <p className="px-3 text-red-400">{error ? error : null}</p>
    </label>
  );
};

export default CustomInput;
