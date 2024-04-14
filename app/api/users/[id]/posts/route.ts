import { connectToDB } from "../../../../../utils/database";
import Recipe from "../../../../../models/recipe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    const recipes = await Recipe.find({
      creator: params.id,
    }).populate("creator");

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to fetch all recipes", { status: 500 });
  }
};
