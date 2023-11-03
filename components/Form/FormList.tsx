import React from 'react';
import Textarea from '../UI/Textarea/Textarea';

interface FormListProps {
  data: {
    label: string;
    description: string;
    addButton: string;
    subTitle?: string;
  };
  post: string[];
  changeInput: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  removeFromArray: (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
  addToArray: (event: React.MouseEvent<HTMLElement>) => void;
}

const FormList = ({
  data,
  post,
  changeInput,
  removeFromArray,
  addToArray,
}: FormListProps) => {
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
              <Textarea
                value={item}
                onChange={(e) => changeInput(e, index)}
                placeholder={data.addButton}
                required={true}
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
