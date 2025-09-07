// import mongoose, { Schema } from "mongoose";

// const moduleSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   slug: {
//     type: String,
//     required: true,
//   },
//   course: {
//     type: String,
//     required: true,
//   },
//   lessonIds: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Lesson",
//     },
//   ],
// });

// export const Module =
//   mongoose.models.Module || mongoose.model("Module", moduleSchema);

import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    duration: {
      type: Number,
      required: true,
    },
    lessonIds: [
      // ✅ Add this block if missing
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Module =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);
