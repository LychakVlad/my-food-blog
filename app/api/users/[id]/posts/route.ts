import { connectToDB } from '../../../../../utils/database';
import Recipe from '../../../../../models/recipe';

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    const recipes = await Recipe.find({
      'creator.id': params.creatorId,
    }).populate('creator');

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all recipes', { status: 500 });
  }
};
