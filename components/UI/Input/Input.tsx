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
}

const CustomInput = ({
  value,
  onChange,
  placeholder,
  label,
  type,
  desc,
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
        required
        className="form_input"
      />
    </label>
  );
};

export default CustomInput;
