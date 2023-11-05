import Link from 'next/link';
import React, { FC } from 'react';
import { IPost } from '../../types/recipe.interface';
import withAuth from '../Routes/withAuth';
import Input from '../UI/Input/Input';
import CustomInput from '../UI/Input/Input';
import FormList from './FormList';
import Textarea from '../UI/Textarea/Textarea';
interface FormProps {
  type: string;
  post: IPost;
  errors: IPost;
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
  errors,
}) => {
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
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updateArr = [...post.steps];
    updateArr[index] = e.target.value;

    setPost({
      ...post,
      steps: updateArr,
    });
  };

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

  const stepRemove = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const updateArr = [...post.steps];
    updateArr.splice(index, 1);

    setPost({
      ...post,
      steps: updateArr,
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

  const stepData = {
    label: 'Directions',
    description:
      'Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).',
    addButton: 'Add step',
    subTitle: 'Step',
  };

  const ingredientData = {
    label: 'Ingredients',
    description:
      'Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).',
    addButton: 'Add ingredient',
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
        <CustomInput
          value={post.photo}
          onChange={(e) => setPost({ ...post, photo: e.target.value })}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />

        <CustomInput
          label="Title"
          placeholder="Recipe title"
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          error={errors.title}
        />

        <Textarea
          value={post.text}
          placeholder="Description..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPost({ ...post, text: e.target.value })
          }
          label="Description"
          error={errors.text}
        />

        <FormList
          data={ingredientData}
          post={post.ingredients}
          changeInput={ingredientChangeInput}
          removeFromArray={ingredientRemove}
          addToArray={addIngredient}
        />

        <FormList
          data={stepData}
          post={post.steps}
          changeInput={stepChangeInput}
          removeFromArray={stepRemove}
          addToArray={addStep}
        />

        <CustomInput
          label="Tag"
          desc="(dinner, lunch, breakfast)"
          placeholder="tag"
          type="text"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />

        <div className="flex">
          <CustomInput
            label="Servings"
            placeholder="10"
            type="text"
            value={post.servings.amount}
            onChange={(e) =>
              setPost({
                ...post,
                servings: { ...post.servings, amount: e.target.value },
              })
            }
          />
          <CustomInput
            label="Yield"
            placeholder="small bowls"
            type="text"
            value={post.servings.yield}
            onChange={(e) =>
              setPost({
                ...post,
                servings: { ...post.servings, yield: e.target.value },
              })
            }
          />
        </div>

        <div className="flex">
          <CustomInput
            value={post.timeToDo.prep}
            label="Time to prep (minutes)"
            placeholder="120"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({
                ...post,
                timeToDo: { ...post.timeToDo, prep: e.target.value },
              })
            }
          />
          <CustomInput
            value={post.timeToDo.cook}
            label="Time to cook (minutes)"
            placeholder="60"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({
                ...post,
                timeToDo: { ...post.timeToDo, cook: e.target.value },
              })
            }
          />
        </div>

        <div className="flex">
          <Input
            value={post.nutrition.cal}
            label="Calories"
            placeholder="200"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({
                ...post,
                nutrition: { ...post.nutrition, cal: e.target.value },
              })
            }
          />
          <Input
            value={post.nutrition.carbs}
            label="Carbs"
            placeholder="30"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({
                ...post,
                nutrition: { ...post.nutrition, carbs: e.target.value },
              })
            }
          />
          <Input
            value={post.nutrition.protein}
            label="Protein"
            placeholder="30"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({
                ...post,
                nutrition: { ...post.nutrition, protein: e.target.value },
              })
            }
          />
          <Input
            value={post.nutrition.fats}
            label="Fats"
            placeholder="10"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPost({
                ...post,
                nutrition: { ...post.nutrition, fats: e.target.value },
              })
            }
          />
        </div>
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

export default withAuth(Form);
