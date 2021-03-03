import mongoose from 'mongoose';
const { Schema } = mongoose;
// Define our model
const upgradeScriptSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default upgradeScriptSchema;
