import Link from 'next/link';
import React, { FC } from 'react';
import { RecipeFormProps } from '../../types/recipe.interface';
import withAuth from '../Routes/withAuth';
import Input from '../UI/Input/Input';
import CustomInput from '../UI/Input/Input';
import FormList from './FormList';
import Textarea from '../UI/Textarea/Textarea';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';

const Form: FC<RecipeFormProps> = ({ type, post, setPost, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      steps: [
        'e.g. Preheat oven to 350 degrees F…',
        'e.g. Combine all dry ingredients in a large bowl…',
        'e.g. Pour into greased trays and bake for 15-20 minutes…',
      ],
      ingredients: [
        'e.g. 2 cups flour, sifted',
        'e.g. 1 cup sugar',
        'e.g. 2 tablespoons butter, softened',
      ],
    },
  });

  const sabmit = (data: FieldValues) => console.log(data);

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
        onSubmit={handleSubmit(sabmit)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <CustomInput
          register={register}
          errors={errors.image}
          type="file"
          name="image"
          accept="image/png, image/jpeg"
        />

        <CustomInput
          label="Title"
          name="title"
          placeholder="Recipe title"
          type="text"
          register={register}
          errors={errors.title}
        />

        <Textarea
          placeholder="Description..."
          label="Description"
          register={register}
          name="description"
        />

        <FormList
          data={ingredientData}
          register={register}
          control={control}
          name={'ingredients'}
        />
        <FormList
          data={stepData}
          register={register}
          control={control}
          name={'steps'}
        />

        <CustomInput
          label="Tag"
          desc="(dinner, lunch, breakfast)"
          placeholder="tag"
          name="tag"
          type="text"
          register={register}
          errors={errors.tag}
        />

        <div className="flex">
          <CustomInput
            label="Servings"
            placeholder="10"
            type="text"
            name="servings"
            register={register}
            errors={errors.servings}
          />
          <CustomInput
            label="Yield"
            placeholder="Small bowls"
            type="text"
            name="yield"
            register={register}
            errors={errors.yield}
          />
        </div>

        <div className="flex">
          <CustomInput
            label="Time to prep (minutes)"
            placeholder="120"
            type="text"
            name="prepTime"
            register={register}
            errors={errors.prepTime}
          />
          <CustomInput
            label="Time to cook (minutes)"
            placeholder="60"
            type="text"
            name="cookTime"
            register={register}
            errors={errors.cookTime}
          />
        </div>

        <div className="flex">
          <Input
            label="Calories"
            name="calories"
            placeholder="200"
            type="text"
            register={register}
            errors={errors.calories}
          />
          <Input
            label="Carbs"
            placeholder="30"
            type="text"
            name="carbs"
            register={register}
            errors={errors.carbs}
          />
          <Input
            label="Protein"
            name="protein"
            placeholder="30"
            type="text"
            register={register}
            errors={errors.protein}
          />
          <Input
            name="fats"
            register={register}
            errors={errors.fats}
            label="Fats"
            placeholder="10"
            type="text"
          />
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {isSubmitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default withAuth(Form);
