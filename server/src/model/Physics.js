import mongoose from "mongoose";
import { QuestionSchema } from "./QuestionModel.js";

const PhysicsSchema = new mongoose.Schema(
  {
    physics: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Physics", PhysicsSchema);
