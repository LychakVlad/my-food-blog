const { Schema, default: mongoose, models, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  hashedPassword: {
    type: String,
    required: [true, 'Password is required!'],
    select: false,
  },
});

const User = models.User || model('User', UserSchema);

export default User;
