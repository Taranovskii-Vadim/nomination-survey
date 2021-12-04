import { Router, Response } from "express";
import { AppRequest } from "../types";

const router = Router();

router.get("/:id", ({ params, userId }: AppRequest, res: Response) => {
  try {
    const { id } = params;

    if (!id) {
      throw new Error("Question id is required");
    }
    //   options: OptionDTO[] | OptionTypeFromServer;
    res.json({ id, description: "question", options: "long" });
  } catch (e) {
    console.log(e);
  }
});

export default router;
