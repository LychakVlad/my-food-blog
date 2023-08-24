import Link from 'next/link';
import React from 'react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  post.ingredients.map((item) => console.log(item));
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
          <div>
            {post.ingredients.map((item, index) => (
              <input
                value={post.ingredients[index]}
                onChange={(e) =>
                  setPost({
                    ...post,
                    ingredients: [...post.ingredients, e.target.value],
                  })
                }
                placeholder="Add ingredient"
                required
                className="form_input"
              />
            ))}
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
