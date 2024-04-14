import { connectToDB } from "../../../utils/database";
import Recipe from "../../../models/recipe";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
export const GET = async (req: Request, res: Response) => {
  try {
    await connectToDB();

    const recipes = await Recipe.find({})
      .populate("creator")
      .select("-hashedPassword");

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all recipes", { status: 500 });
  }
};
