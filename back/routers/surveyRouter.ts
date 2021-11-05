import { Response, Router } from "express";

import { AppRequest } from "../types";

const router = Router();

router.get("/", ({ userId }: AppRequest, res: Response) => {
  try {
    res.json({ test: "test" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/:surveyId", ({ params, userId }: AppRequest, res: Response) => {
  try {
    const { surveyId } = params;

    if (!surveyId) {
      throw new Error("Survey id is required");
    }

    res.json({ test: surveyId });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
