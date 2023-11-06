import React from 'react';
import CustomInput from '../UI/Input/Input';
import { Control, useFieldArray } from 'react-hook-form';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormListProps {
  data: {
    label: string;
    description: string;
    addButton: string;
    subTitle?: string;
  };
  register: UseFormRegister<FieldValues>;
  name: string;
  control: Control;
}

const FormList = ({ data, register, name, control }: FormListProps) => {
  const { fields, append, remove } = useFieldArray({
    name: name,
    control,
  });

  return (
    <>
      <h2 className="font-satoshi font-semibold text-base text-gray-700">
        {data.label}
      </h2>
      <p className=" opacity-50">{data.description}</p>
      <div className="flex  flex-col">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={'section flex'} key={field.id}>
                <CustomInput
                  register={register}
                  placeholder={'placeholder'}
                  name={`${name}.${index}` as const}
                  className="form_input min-h-[50px] w-full"
                  type="text"
                />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => append(`Add ${name.slice(0, -1)}`)}
        >
          Add {name.slice(0, -1)}
        </button>
      </div>
    </>
  );
};

export default FormList;
