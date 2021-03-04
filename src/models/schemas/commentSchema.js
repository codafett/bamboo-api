import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define our model
const commentSchema = new Schema({
  comment: {
    type: String,
    lowercase: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default commentSchema;
