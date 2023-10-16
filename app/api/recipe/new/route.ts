import { connectToDB } from '../../../../utils/database';
import Text from '../../../../models/recipe';

export const POST = async (req: Request, res: Response) => {
  const { userId, text, tag, title, ingredients } = await req.json();

  try {
    await connectToDB();

    const newRecipe = new Text({
      creator: userId,
      title,
      text,
      tag,
      ingredients,
    });

    await newRecipe.save();
    console.log('Received Data:', { userId, text, tag, title, ingredients });

    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    console.log('internal error');
    console.dir(error);
  }
};
