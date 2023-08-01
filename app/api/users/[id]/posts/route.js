import { connectToDB } from '@utils/database';
import Text from '@models/recipe';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const recipes = await Text.find({ creator: params.id }).populate('creator');

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all recipes', { status: 500 });
  }
};
