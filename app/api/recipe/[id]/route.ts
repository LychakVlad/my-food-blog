import { connectToDB } from "../../../../utils/database";
import Recipe from "../../../../models/recipe";
import Comment from "../../../../models/comment";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();
    let recipeWithComments;

    recipeWithComments = await Recipe.findById(params.id)
      .populate("creator")
      .populate("comments");

    if (!recipeWithComments) {
      return new NextResponse("Recipe not found", { status: 404 });
    }

    return NextResponse.json(recipeWithComments, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to fetch recipe", { status: 500 });
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
      return new Response("Recipe not found", { status: 404 });

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
    return new Response("Failed to update recipe", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    await Comment.deleteMany({ postId: params.id });

    await Recipe.findByIdAndRemove(params.id);

    return new Response("Recipe deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete recipe", { status: 500 });
  }
};
