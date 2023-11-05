import React from 'react';

interface CustomTextAreatProps {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  error: string;
}

const Textarea = ({
  value,
  onChange,
  label,
  placeholder,
  className,
  required,
  error,
}: CustomTextAreatProps) => {
  return (
    <label>
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form_textarea ${className} ${
          error ? ' border-red-400' : null
        }`}
      ></textarea>
      <p className=" text-red-400">{error !== '' ? error : null}</p>
    </label>
  );
};

export default Textarea;
