import { connectToDB } from "../../../../../utils/database";
import Recipe from "../../../../../models/recipe";
import { NextResponse } from "next/server";
import { CustomApiResponse } from "types/env.interface";

export const GET = async (request: Request, res: CustomApiResponse) => {
  try {
    await connectToDB();

    if (!res.params?.id) {
      return new NextResponse("Id is missing", { status: 500 });
    }

    const postId = res.params.id;

    const recipes = await Recipe.find({
      creator: postId,
    }).populate("creator");

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all posts", { status: 500 });
  }
};
