import { connectToDB } from '../../../../utils/database';
import Recipe from '../../../../models/recipe';

export const POST = async (req: Request, res: Response) => {
  const {
    userId,
    text,
    tag,
    title,
    ingredients,
    steps,
    photo,
    servings,
    timeToDo,
  } = await req.json();
  console.log(timeToDo);

  try {
    await connectToDB();

    const newRecipe = new Recipe({
      creator: userId,
      title,
      text,
      tag,
      ingredients,
      steps,
      photo,
      servings,
      timeToDo,
    });

    console.log(newRecipe);

    await newRecipe.save();

    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    console.log('internal error');
    console.dir(error);
  }
};
