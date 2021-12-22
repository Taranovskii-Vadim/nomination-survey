import { Response, Router } from "express";
import path from "path";
import fs from "fs";

import Survey from "../models/Survey";
import QuestionModel from "../models/Question";
import { Question } from "../models/Question/types";
import { getSurveysRender } from "../models/Survey/helpers";
import { SurveyDataBase } from "../models/Survey/types";

import { AppRequest } from "../types";
import FileReader from "../models/FileReader";

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

router.get("/download/:surveyId", ({ params }: AppRequest, res: Response) => {
  try {
    const { surveyId } = params;
    // TODO think how to download file from server
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/:surveyId")
  .get(async ({ params, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;
      const { id } = user;

      if (!surveyId) {
        throw new Error("Survey id is required");
      }

      // const filePath =

      const survey: SurveyDataBase = await Survey.findById(surveyId);

      res.json(survey);
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  .post(async ({ params, body, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;
      const { login, id } = user;
      const survey = (await Survey.findById(surveyId)) as SurveyDataBase;

      const questionPromiseResult = await Promise.all<Question>(
        Object.keys(body).map((item) => QuestionModel.findById(item))
      );

      const questionFilePayload = questionPromiseResult.map(
        ({ id, description }) => ({ description, answer: body[id] })
      );

      await FileReader.writeFileToRoot("results", `${surveyId}.json`, {
        id,
        login,
        title: survey.title,
        answers: questionFilePayload,
      });

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  .put(async ({ params, body, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;
      const { nextStatus } = body;

      const survey = await Survey.findById(surveyId);

      survey.status = nextStatus;

      await survey.save();

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

export default router;
