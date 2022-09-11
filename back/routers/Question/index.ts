import { Router, Response } from "express";

import FileModel from "../../models/FileModel";

import { Request } from "../../types";
import { Question } from "./types";

const router = Router();

router.get("/:id", async ({ params }: Request, res: Response) => {
  const questionId = parseInt(params.id);
  const questions = await FileModel.getData<Question[]>("questions.json");

  if (!questionId) {
    res.status(400).json({ message: "Incorrect id" });
  }

  const question = questions.find((item) => item.id === questionId);

  if (!question) {
    res.status(404).json({ message: "Question not found" });
  }

  res.json(question);
});

export default router;
