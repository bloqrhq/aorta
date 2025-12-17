import express from "express";
import {
  addQuestion,
  addManyQuestions,
  getAllQuestions,
  getByYear,
} from "../controllers/QuestionControllers.js";
import { validateQuestion } from "../middleware/ValidateQuestion.js";

const router = express.Router();

// Add single question
router.post("/:subject", validateQuestion, addQuestion);

// Add multiple questions (bulk insert)
router.post("/:subject/bulk", addManyQuestions);

// Get all questions
router.get("/:subject", getAllQuestions);

// Get questions by year
router.get("/:subject/year/:year", getByYear);

export default router;