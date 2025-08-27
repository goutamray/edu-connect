import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    duration: {
      type: Number,
      required: true,
    },
    video_url: {
      type: String,
      required: false,
    },
    published: {
      type: Boolean,
      required: false,
    },
    slug: {
      type: String,
      required: false,
    },
    access: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Lesson =
  mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);
