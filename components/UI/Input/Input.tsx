import React, { ChangeEventHandler, FC } from 'react';

interface CustomInputProps {
  value: string | number;
  label: string;
  type: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const CustomInput = ({
  value,
  onChange,
  placeholder,
  label,
  type,
}: CustomInputProps) => {
  return (
    <label className="w-full">
      <span className="font-satoshi font-semibold text-base text-gray-700 ">
        {label}
      </span>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder="Recipe title"
        required
        className="form_input"
      />
    </label>
  );
};

export default CustomInput;
