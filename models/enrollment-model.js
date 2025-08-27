import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
  enrollment_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  enrollment_date: {
    type: Date,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
