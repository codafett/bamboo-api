import mongoose from 'mongoose';
import commentSchema from './commentSchema';

const { Schema } = mongoose;

// Define our model
const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  comments: {
    type: [commentSchema]
  }
});

export default productSchema;
