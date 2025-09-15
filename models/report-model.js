import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  // totalCompletedLessons: {
  //   type: Array,
  //   required: true,
  // },
  // totalCompletedModeules: {
  //   type: Array,
  //   required: true,
  // },
  totalCompletedLessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson", // or whatever model these represent
    },
  ],
  totalCompletedModules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Module",
    },
  ],

  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  quizAssessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment",
  },
});

export const Report =
  mongoose.models.Report || mongoose.model("Report", reportSchema);
