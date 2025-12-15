import mongoose from "mongoose";
import { QuestionSchema } from "./QuestionModel.js";

const BotanySchema = new mongoose.Schema(
  {
    botany: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Botany", BotanySchema);
