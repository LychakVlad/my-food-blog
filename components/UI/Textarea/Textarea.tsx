import React from 'react';

interface CustomTextAreatProps {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  placeholder?: string;
  className?: string;
}

const Textarea = ({ label, placeholder, className, register, name }) => {
  return (
    <label>
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {label}
      </span>
      <textarea
        name="name"
        placeholder={placeholder}
        {...register(name)}
        className={`form_textarea ${className} `}
      ></textarea>
    </label>
  );
};

export default Textarea;
