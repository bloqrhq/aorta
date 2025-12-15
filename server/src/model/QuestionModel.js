import mongoose from "mongoose";

const { Schema } = mongoose;

export const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
    },

    correct_answer: {
      type: Number,
      required: true,
      min: 0,
    },

    year: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["textual", "numerical", "image"],
      default: "textual",
    },
  },
  { timestamps: false }
);
