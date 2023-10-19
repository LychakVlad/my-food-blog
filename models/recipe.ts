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
  steps: {
    type: [String],
    required: [true, 'Steps are required'],
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
  },
});

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
