import Link from "next/link";
import React, { FC } from "react";
import { RecipeFormProps } from "../../types/recipe.interface";
import withAuth from "../Routes/withAuth";
import CustomInput from "../UI/Input/Input";
import FormList from "./FormList";
import Textarea from "../UI/Textarea/Textarea";

const Form: FC<RecipeFormProps> = ({ type, onSubmit, form, submitError }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  console.log(submitError);

  const stepData = {
    label: "Directions",
    description:
      "Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).",
    addButton: "Add step",
    subTitle: "Step",
  };

  const ingredientData = {
    label: "Ingredients",
    description:
      "Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).",
    addButton: "Add ingredient",
  };

  return (
    <section className="w-full max-w-fill flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>
      <p className="desc text-left max-w-md" data-testid="form-title">
        {type} and share your best recipes
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {type === "Create" && (
          <CustomInput
            register={register}
            errors={errors?.photo}
            label="Photo"
            type="file"
            name="photo"
            accept="image/*"
            required={true}
          />
        )}

        <CustomInput
          name="title"
          register={register}
          errors={errors?.title}
          label="Recipe Title"
          placeholder="Enter the title"
          type="text"
          required={true}
          cytest="title-input"
        />

        <Textarea
          placeholder="Description..."
          label="Description"
          register={register}
          name="description"
          required={true}
          errors={errors?.description}
          cytest="description-input"
        />

        <FormList
          data={ingredientData}
          register={register}
          control={control}
          name={"ingredients"}
        />
        <FormList
          data={stepData}
          register={register}
          control={control}
          name={"steps"}
        />

        <CustomInput
          label="Tag"
          desc="(dinner, lunch, breakfast)"
          placeholder="tag"
          name="tag"
          type="text"
          register={register}
          errors={errors?.tag}
          required={true}
          cytest="tag-input"
        />

        <div className="flex gap-10">
          <CustomInput
            label="Servings"
            placeholder="10"
            type="number"
            name="servings"
            register={register}
            errors={errors?.servings}
            required={true}
          />
          <CustomInput
            label="Yield"
            placeholder="Small bowls"
            type="text"
            name="yield"
            register={register}
            errors={errors?.yield}
            required={true}
          />
        </div>

        <div className="flex gap-10">
          <CustomInput
            label="Time to prep (minutes)"
            placeholder="120"
            type="number"
            name="prepTime"
            register={register}
            errors={errors?.prepTime}
            required={true}
          />
          <CustomInput
            label="Time to cook (minutes)"
            placeholder="60"
            type="number"
            name="cookTime"
            register={register}
            errors={errors?.cookTime}
            required={true}
          />
        </div>

        <div className="sm:flex sm:gap-10">
          <CustomInput
            label="Calories"
            name="calories"
            placeholder="200"
            type="number"
            register={register}
            errors={errors?.calories}
            required={true}
          />
          <CustomInput
            label="Carbs"
            placeholder="30"
            type="number"
            name="carbs"
            register={register}
            errors={errors?.carbs}
            required={true}
          />
          <CustomInput
            label="Protein"
            name="protein"
            placeholder="30"
            type="number"
            register={register}
            errors={errors?.protein}
            required={true}
          />
          <CustomInput
            name="fats"
            register={register}
            errors={errors?.fats}
            label="Fats"
            placeholder="10"
            type="number"
            required={true}
          />
        </div>
        <div className=" justify-between mx-3 mb-5 gap-4">
          <div className="gap-4 mb-4">
            {" "}
            <Link href="/" className="text-gray-500 text-lg">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit_btn ml-4 text-2xl"
              data-cy="submit-form-btn"
            >
              {isSubmitting ? `${type} is in process...` : type}
            </button>
          </div>
          <div
            className={`text-red-500 text-lg font-bold bg-red-100 text-center p-4 transition-all ${
              submitError ? "opacity-100" : "opacity-0"
            }`}
          >
            Something went wrong, please retry later
          </div>
        </div>
      </form>
    </section>
  );
};

export default withAuth(Form);
