import React from 'react';

const Textarea = ({ value, onChange, label }) => {
  return (
    <label>
      <span className="font-satoshi font-semibold text-base text-gray-700">
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="form_textarea"
      ></textarea>
    </label>
  );
};

export default Textarea;
