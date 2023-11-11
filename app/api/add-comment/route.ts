import mongoose from 'mongoose';
import Comment from '../../../models/comment';
import { connectToDB } from '../../../utils/database';
import Recipe from '../../../models/recipe';

export const POST = async (req: Request, res: Response) => {
  const { text, postId, creatorName } = await req.json();

  try {
    await connectToDB();

    const newComment = new Comment({ text, creatorName, postId });

    await newComment.save();

    const existingPost = await Recipe.findById(postId);

    existingPost.comments.push(newComment._id);

    await existingPost.save();

    console.log('postId:', postId);
    console.log('newComment._id:', newComment._id);
    console.log('existingPost:', existingPost);

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.log('internal error');
    console.dir(error);
  }
};
