import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
