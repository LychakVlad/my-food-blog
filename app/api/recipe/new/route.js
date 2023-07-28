import { connectToDB } from '@utils/database';
import Text from '@models/recipe';

export const POST = async (req, res) => {
  const { userId, text, tag } = await req.json();

  try {
    await connectToDB();
    const newRecipe = new Text({
      creator: userId,
      text,
      tag,
    });

    await newRecipe.save();

    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new recipe', { status: 500 });
  }
};
