import { connectToDB } from '../../../utils/database';
import Recipe from '../../../models/recipe';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const GET = async (request: NextRequest, { params }: any) => {
  try {
    await connectToDB();

    const recipes = await Recipe.find({})
      .populate('creator')
      .select('-hashedPassword');

    return new NextResponse(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to fetch all recipes', { status: 500 });
  }
};
