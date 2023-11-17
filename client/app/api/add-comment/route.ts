import mongoose from 'mongoose';
import Comment from '../../../models/comment';
import { connectToDB } from '../../../utils/database';
import Recipe from '../../../models/recipe';
import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
  const { text, postId, creatorName, rating } = await req.json();

  try {
    await connectToDB();

    const newComment = new Comment({ text, creatorName, postId, rating });

    await newComment.save();

    const existingPost = await Recipe.findById(postId);

    existingPost.comments.push(newComment._id);

    await existingPost.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.log('internal error');
    console.dir(error);
  }
};
