import Recipe from "./recipe";

const { Schema, default: mongoose, models, model } = require("mongoose");

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
  rating: {
    type: Number,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: Recipe,
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
