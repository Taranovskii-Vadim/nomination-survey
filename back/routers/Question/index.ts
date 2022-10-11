import { Router, Response } from "express";

import { RequestWithId } from "../../types";
import FileModel from "../../models/FileModel";

import { Question } from "./types";

const router = Router();

router.get("/:id", async ({ params: { id } }: RequestWithId, res: Response) => {
  try {
    const questionId = parseInt(id);
    const questions = await FileModel.getData<Question[]>("questions.json");

    if (!questionId) {
      return res.status(400).json({ message: "Incorrect id" });
    }

    const question = questions.find((item) => item.id === questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(question);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
