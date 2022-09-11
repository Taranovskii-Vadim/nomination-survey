import { Router, Response } from "express";
import FileModel from "../../models/FileModel";

import { Request } from "../../types";
import { Question, Question as QuestionType } from "./types";

const router = Router();

router.get("/:id", async ({ params, user }: Request, res: Response) => {
  try {
    const { id } = params;
    const questions = await FileModel.getData<Question[]>(
      "database",
      "questions.json"
    );

    if (!id) {
      throw new Error("Question id is required");
    }

    const question: QuestionType | null = questions.find(
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
