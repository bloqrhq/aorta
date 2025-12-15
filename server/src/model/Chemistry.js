import mongoose from "mongoose";
import { QuestionSchema } from "./QuestionModel.js";

const ChemistrySchema = new mongoose.Schema(
  {
    chemistry: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chemistry", ChemistrySchema);
