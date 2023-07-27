import React from 'react';

const Form = ({ type, post, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-fill flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>
    </section>
  );
};

export default Form;
