import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
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
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
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
      required: true,
    },
    createdOn: {
      type: Date,
      required: true,
    },
    modifiedOn: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
