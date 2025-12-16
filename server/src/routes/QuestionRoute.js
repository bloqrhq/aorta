import express from "express";
import {
  addQuestion,
  getAllQuestions,
  getByYear,
  getByCategory,
  getByYearAndCategory,
  getQuestionById,
  getQuestionStats,
} from "../controllers/QuestionControllers.js";
import { validateQuestion } from "../middleware/ValidateQuestion.js";

const router = express.Router();

// Add question
router.post("/:subject", validateQuestion, addQuestion);

// Get all questions
router.get("/:subject", getAllQuestions);

// Get question statistics
router.get("/:subject/stats", getQuestionStats);

// Get questions by year
router.get("/:subject/year/:year", getByYear);

// Get questions by category
router.get("/:subject/category/:category", getByCategory);

// Get questions by year and category
router.get("/:subject/year/:year/category/:category", getByYearAndCategory);

// Get a specific question by ID
router.get("/:subject/question/:id", getQuestionById);

export default router;
