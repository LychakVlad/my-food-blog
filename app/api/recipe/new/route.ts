import { connectToDB } from '../../../../utils/database';
import Text from '../../../../models/recipe';

export const POST = async (req: Request) => {
  const { userId, text, tag, title } = await req.json();

  try {
    await connectToDB();
    const newRecipe = new Text({
      creator: userId,
      title,
      text,
      tag,
    });

    await newRecipe.save();
    console.log('Received Data:', { userId, text, tag, title });

    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new recipe', { status: 500 });
  }
};
