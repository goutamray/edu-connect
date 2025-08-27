import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  lessionIds: {
    type: [String],
    required: true,
  },
});

export const Module =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);
