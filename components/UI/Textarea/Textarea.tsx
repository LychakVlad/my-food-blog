import React from 'react';

interface CustomTextAreatProps {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const Textarea = ({
  value,
  onChange,
  label,
  placeholder,
  className,
  required,
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
        className={`form_textarea ${className}`}
      ></textarea>
    </label>
  );
};

export default Textarea;
