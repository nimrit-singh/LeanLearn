import { Request, Response } from "express";
import { quiz, getQuiz, updateQuizById } from "../models/createQuiz";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { class: quizClass, topic, questions } = req.body;
    const result = await quiz({
      class: quizClass,
      topic,
      questions,
      status: "drafted",
    });
    res.status(201).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuizByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const result = await getQuiz(status);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateQuizById(id, updatedData);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
