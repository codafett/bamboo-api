import upgradeScriptSchema from './upgradeScriptSchema';

import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define our model
const versionSchema = new Schema({
  major: {
    type: Number,
    required: true,
  },
  minor: {
    type: Number,
    required: true,
  },
  build: {
    type: Number,
    required: true,
  },
  scriptsRun: {
    type: [upgradeScriptSchema],
    default: [],
  },
});

versionSchema.statics.getLatestVersion = async function getLatestVersion() {
  const [version] = await this.find().sort({ major: -1, minor: -1, build: -1 }).limit(1);
  return version;
};

export default versionSchema;
