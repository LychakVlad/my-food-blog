import mongoose from 'mongoose';
import Comment from '../../../models/comment';
import { connectToDB } from '../../../utils/database';
import Recipe from '../../../models/recipe';

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

export const DELETE = async (req: Request, res: Response) => {
  const { id, postId } = await req.json();

  try {
    await connectToDB();

    const existingPost = await Recipe.findById(postId);

    const findComment = existingPost.comments.indexOf(id);
    if (findComment > -1) {
      existingPost.comments.splice(findComment, 1);
    }

    await existingPost.save();

    await Comment.findByIdAndRemove(id);

    return new Response('Comment deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete comment', { status: 500 });
  }
};
