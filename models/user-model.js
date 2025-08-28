import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    socialMedia: {
      type: Object,
      required: false,
    },
    profile_picture: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
