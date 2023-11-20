import React from 'react';
import CustomInput from '../UI/Input/Input';
import { useFieldArray } from 'react-hook-form';
import { FormListProps } from '../../types/form.interface';
import Image from 'next/image';
import closeIcon from '/assets/icons/close.svg';

const FormList = ({ data, register, name, control }: FormListProps) => {
  const { fields, append, remove } = useFieldArray({
    name: name,
    control,
    rules: { minLength: 1 },
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
              <section className={'flex items-center mt-5'} key={field.id}>
                <CustomInput
                  register={register}
                  placeholder={'placeholder'}
                  name={`${name}.${index}` as const}
                  className="form_input w-full"
                  type="text"
                  required={true}
                />
                {fields.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="h-full px-4"
                  >
                    <Image
                      src={closeIcon}
                      width={36}
                      height={36}
                      className="rounded-full"
                      alt="logo"
                    />
                  </button>
                )}
              </section>
            </div>
          );
        })}
        <button
          type="button"
          className="outline_btn mt-8"
          onClick={() => append(`Add ${name.slice(0, -1)}`)}
        >
          Add {name.slice(0, -1)}
        </button>
      </div>
    </>
  );
};

export default FormList;
