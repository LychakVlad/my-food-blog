import { connectToDB } from '../../../../utils/database';
import Recipe from '../../../../models/recipe';
import Comment from '../../../../models/recipe';

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    const recipe = await Recipe.findById(params.id).populate('comments');
    if (!recipe) return new Response('Recipe not found', { status: 404 });

    const comments = await Comment.find({ id: { $in: recipe.comments } });

    const responseData = { recipe, comments: recipe.comments };

    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch recipe', { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: any) => {
  const {
    description,
    tag,
    title,
    ingredients,
    creator,
    steps,
    photo,
    nutrition,
    servings,
    timeToDo,
  } = await request.json();

  try {
    await connectToDB();

    const existingRecipe = await Recipe.findById(params.id);
    if (!existingRecipe)
      return new Response('Recipe not found', { status: 404 });

    existingRecipe.description = description;
    existingRecipe.tag = tag;
    existingRecipe.title = title;
    existingRecipe.ingredients = ingredients;
    existingRecipe.timeToDo = timeToDo;
    existingRecipe.nutrition = nutrition;
    existingRecipe.servings = servings;
    existingRecipe.creator = creator;
    existingRecipe.steps = steps;
    existingRecipe.photo = photo;

    await existingRecipe.save();

    return new Response(JSON.stringify(existingRecipe), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update recipe', { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    await Recipe.findByIdAndRemove(params.id);

    return new Response('Recipe deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete recipe', { status: 500 });
  }
};
