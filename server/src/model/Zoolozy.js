import mongoose from "mongoose";
import { QuestionSchema } from "./QuestionModel.js";

const ZoologySchema = new mongoose.Schema(
  {
    zoology: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Zoology", ZoologySchema);
