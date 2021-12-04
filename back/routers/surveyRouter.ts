import { Response, Router } from "express";

import { AppRequest } from "../types";

const router = Router();

router.get("/", ({ userId }: AppRequest, res: Response) => {
  try {
    res.json([
      { id: "123", status: "chiefVote", title: "test" },
      { id: "1234", status: "chiefVote", title: "test" },
      { id: "1235", status: "chiefVote", title: "test" },
    ]);
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

    res.json({
      id: surveyId,
      status: "chiefVote",
      title: "test" + surveyId,
      questions: ["34", "56", "76", "89"],
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default router;
