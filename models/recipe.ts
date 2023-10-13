const { Schema, default: mongoose, models, model } = require('mongoose');

const RecipeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  text: {
    type: String,
    required: [true, 'Text is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
});

const Text = models.Text || model('Text', RecipeSchema);

export default Text;
