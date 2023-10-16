import { connectToDB } from '../../../../../utils/database';
import Text from '../../../../../models/recipe';

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    // Use the correct field name and query structure to find recipes associated with a specific creator's ID
    const recipes = await Text.find({
      'creator.id': params.creatorId,
    }).populate('creator');

    console.log(recipes);

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all recipes', { status: 500 });
  }
};
