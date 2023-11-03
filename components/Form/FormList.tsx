import React from 'react';

const FormList = ({ data, post, changeInput, removeFromArray, addToArray }) => {
  return (
    <div>
      <h2 className="font-satoshi font-semibold text-base text-gray-700">
        {data.label}
      </h2>
      <p className=" opacity-50">{data.description}</p>
      <div className="flex  flex-col">
        {post.map((item: string, index: number) => (
          <div className="py-3" key={index}>
            {data.subTitle ? (
              <h3>
                {data.subTitle} {index + 1}
              </h3>
            ) : null}

            <div className="flex items-center">
              <textarea
                value={item}
                onChange={(e) => changeInput(e, index)}
                placeholder={data.addButton}
                required
                className="form_input min-h-[50px]"
              />
              <button onClick={(e) => removeFromArray(e, index)}>Remove</button>
            </div>
          </div>
        ))}
        <button onClick={(e) => addToArray(e)}>{data.addButton}</button>
      </div>
    </div>
  );
};

export default FormList;
