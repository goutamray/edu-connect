import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quizSet: {
      type: Schema.Types.ObjectId,
      ref: "QuizSet",
    },
    testimonials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
    learning: {
      type: [String],
      required: false,
    },
    createdOn: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    modifiedOn: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
