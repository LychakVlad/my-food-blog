import React from 'react';

const FormList = ({
  label,
  description,
  post,
  changeInput,
  removeFromArray,
  addToArray,
}) => {
  return (
    <div>
      <h2 className="font-satoshi font-semibold text-base text-gray-700">
        {label}
      </h2>
      <p className=" opacity-50">{description}</p>
      <div className="flex  flex-col">
        {post.steps.map((item: string, index: number) => (
          <div className="py-3" key={index}>
            <h3>Step {index + 1}</h3>
            <div className="flex items-center">
              <textarea
                value={item}
                onChange={(e) => changeInput(e, index)}
                placeholder="Add step"
                required
                className="form_input min-h-[50px]"
              />
              <button onClick={(e) => removeFromArray(e, index)}>Remove</button>
            </div>
          </div>
        ))}
        <button onClick={(e) => addToArray(e)}>Add step</button>
      </div>
    </div>
  );
};

export default FormList;
