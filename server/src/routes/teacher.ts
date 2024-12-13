import express from "express";
import {
  createQuiz,
  getQuizByStatus,
  updateQuiz,
} from "../controllers/createQuiz";

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.get("/quiz/:status", getQuizByStatus); // Status: drafted, completed, ongoing
router.post("/editQuiz/:id", updateQuiz);

export default router;
