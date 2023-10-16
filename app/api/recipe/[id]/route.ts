import { connectToDB } from '../../../../utils/database';
import Text from '../../../../models/recipe';

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    const recipe = await Text.findById(params._id).populate('creator');
    if (!recipe) return new Response('Recipe not found', { status: 404 });

    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch recipe', { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: any) => {
  const { text, tag, title } = await request.json();
  try {
    await connectToDB();

    const existingRecipe = await Text.findById(params._id);
    if (!existingRecipe)
      return new Response('Recipe not found', { status: 404 });

    existingRecipe.text = text;
    existingRecipe.tag = tag;
    existingRecipe.title = title;

    await existingRecipe.save();

    return new Response(JSON.stringify(existingRecipe), { status: 200 });
  } catch (error) {
    return new Response('Failed to update recipe', { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    await Text.findByIdAndRemove(params.id);

    return new Response('Recipe deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete recipe', { status: 500 });
  }
};
