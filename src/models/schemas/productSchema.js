import mongoose from 'mongoose';
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
});

export default productSchema;
