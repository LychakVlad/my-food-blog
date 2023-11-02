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
  servings: {
    amount: {
      type: String,
      required: [true, 'Servings amount is required'],
    },
    yield: {
      type: String,
    },
  },
  timeToDo: {
    prep: {
      type: Number,
    },
    cook: {
      type: Number,
      required: [true, 'Cook time is required'],
    },
  },
  nutrition: {
    cal: { type: String, required: [true, 'Calories amount is required'] },
    protein: { type: String, required: [true, 'Protein amount is required'] },
    carbs: { type: String, required: [true, 'Carbs amount is required'] },
    fats: { type: String, required: [true, 'Fats amount is required'] },
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  time: { type: Date, default: Date.now },
  ingredients: {
    type: [String],
    required: [true, 'Ingredients are required'],
  },
});

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
