import Link from 'next/link';
import React, { ChangeEvent, FC, useState } from 'react';
import { IPost } from '../types/recipe.interface';

interface FormProps {
  type: string;
  post: IPost;
  setPost: React.Dispatch<React.SetStateAction<IPost>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const Form: FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  const ingredientChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updateArr = [...post.ingredients];
    updateArr[index] = e.target.value;

    setPost({
      ...post,
      ingredients: updateArr,
    });
  };

  const ingredientRemove = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const updateArr = [...post.ingredients];
    updateArr.splice(index, 1);

    setPost({
      ...post,
      ingredients: updateArr,
    });
  };

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const updateArr = [...post.ingredients];
    updateArr.push('');

    setPost({
      ...post,
      ingredients: updateArr,
    });
  };

  const addStep = (e: React.FormEvent) => {
    e.preventDefault();
    const updateArr = [...post.steps];
    updateArr.push('');

    setPost({
      ...post,
      steps: updateArr,
    });
  };

  const stepChangeInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updateArr = [...post.steps];
    updateArr[index] = e.target.value;

    setPost({
      ...post,
      steps: updateArr,
    });
  };

  const stepRemove = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const updateArr = [...post.steps];
    updateArr.splice(index, 1);

    setPost({
      ...post,
      steps: updateArr,
    });
  };

  return (
    <section className="w-full max-w-fill flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your best recipes
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <input
          value={post.photo}
          onChange={(e) => setPost({ ...post, photo: e.target.value })}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Recipe title"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={post.text}
            onChange={(e) => setPost({ ...post, text: e.target.value })}
            placeholder="Description..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <div>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Ingredients
          </span>
          <p className=" opacity-50">
            Enter one ingredient per line. Include the quantity (i.e. cups,
            tablespoons) and any special preparation (i.e. sifted, softened,
            chopped). Use optional headers to organize the different parts of
            the recipe (i.e. Cake, Frosting, Dressing).
          </p>
          <div className="flex  flex-col">
            {post.ingredients.map((item: string, index: number) => (
              <div className="flex items-center" key={index}>
                <input
                  value={item}
                  onChange={(e) => ingredientChangeInput(e, index)}
                  placeholder="Add ingredient"
                  required
                  className="form_input"
                />
                <button onClick={(e) => ingredientRemove(e, index)}>
                  Remove
                </button>
              </div>
            ))}
            <button onClick={(e) => addIngredient(e)}>Add ingredient</button>
          </div>
        </div>

        <div>
          <h2 className="font-satoshi font-semibold text-base text-gray-700">
            Directions
          </h2>
          <p className=" opacity-50">
            Explain how to make your recipe, including oven temperatures, baking
            or cooking times, and pan sizes, etc. Use optional headers to
            organize the different parts of the recipe (i.e. Prep, Bake,
            Decorate).
          </p>
          <div className="flex  flex-col">
            {post.steps.map((item: string, index: number) => (
              <div className="py-3" key={index}>
                <h3>Step {index + 1}</h3>
                <div className="flex items-center">
                  <textarea
                    value={item}
                    onChange={(e) => stepChangeInput(e, index)}
                    placeholder="Add step"
                    required
                    className="form_input min-h-[50px]"
                  />
                  <button onClick={(e) => stepRemove(e, index)}>Remove</button>
                </div>
              </div>
            ))}
            <button onClick={(e) => addStep(e)}>Add step</button>
          </div>
        </div>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal"> (#dinner, #lunch, #breakfast)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
