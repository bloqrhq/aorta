import express from "express";
import {
  addQuestion,
  getAllQuestions,
  getByYear,
} from "../controllers/QuestionControllers.js";
import { validateQuestion } from "../middleware/validateQuestion.js";

const router = express.Router();

// Add question
router.post("/:subject", validateQuestion, addQuestion);

// Get all questions
router.get("/:subject", getAllQuestions);

// Get questions by year
router.get("/:subject/year/:year", getByYear);

export default router;
