// TODO:
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);
