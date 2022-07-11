import { Router, Response } from "express";
import { QUESTIONS } from "../models/Question/constants";

import { Question as QuestionType } from "../models/Question/types";
import { AppRequest } from "../types";

const router = Router();

router.get("/:id", async ({ params, user }: AppRequest, res: Response) => {
  try {
    const { id } = params;

    if (!id) {
      throw new Error("Question id is required");
    }

    const question: QuestionType | null = QUESTIONS.find(
      (item) => item.id === id
    );

    if (!question) {
      res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (e) {
    res.status(500).json("Server error");
  }
});

export default router;
