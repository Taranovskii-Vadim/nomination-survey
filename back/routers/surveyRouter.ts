import { Response, Router } from "express";

import Survey from "../models/Survey";
import { getSurveysRender } from "../models/Survey/helpers";
import { SurveyDataBase } from "../models/Survey/types";

import { AppRequest } from "../types";

const router = Router();

router.get("/", async ({ user }: AppRequest, res: Response) => {
  try {
    const surveys: SurveyDataBase[] = await Survey.find();

    const result = surveys.map((item) => getSurveysRender(item));

    res.json(result);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get(
  "/:surveyId",
  async ({ params, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;

      if (!surveyId) {
        throw new Error("Survey id is required");
      }

      const survey: SurveyDataBase = await Survey.findById(surveyId);

      res.json(survey);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

router.post(
  "/:surveyId",
  async ({ params, body, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;
      // console.log(body);
      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

export default router;
