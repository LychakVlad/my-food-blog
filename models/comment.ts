import mongoose, { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  creatorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
