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
  method: {
    type: String,
    required: true,
  },
  completion_date: {
    type: Date,
    required: false,
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
