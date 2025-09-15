import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema(
  {
    assessments: {
      type: Array,
      required: true,
    },
    otherMarks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);
