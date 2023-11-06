import React, { ChangeEventHandler, FC } from 'react';

interface CustomInputProps {
  type: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  name?: string;
  id?: string;
  accept?: string;
  className?: string;
  errors?: any;
  register: any;
  autoComplete?: any;
}

const CustomInput = ({
  placeholder,
  label,
  type,
  desc,
  className,
  errors,
  name,
  register,
  autoComplete,
}: CustomInputProps) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
        <span className="font-normal"> {desc}</span>
      </label>
      <div className="mt-2">
        <input
          {...register(name, {
            required: `${name} is required`,
          })}
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`form_input  ${className} ${errors && 'border-red-500'} `}
        />
        {errors && (
          <p className="text-red-500 mt-2">{`${label} field is required`}</p>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
