import { Response, Router } from "express";

import Survey from "../models/Survey";
import QuestionModel from "../models/Question";
import FileReader from "../models/FileReader";
import { Question } from "../models/Question/types";
import { getSurveysRender } from "../models/Survey/helpers";
import { FileData, SurveyDataBase } from "../models/Survey/types";

import { AppRequest } from "../types";
import { mapUserRole } from "./helpers";
import { UserRole } from "../models/User/types";

const CATALOG = "results";

const getFileName = (id: string): string => `${id}.json`;

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

router.get(
  "/results/:role/:surveyId",
  async ({ params }: AppRequest, res: Response) => {
    try {
      const apiResult = {};
      const { surveyId, role } = params;
      const { users } = await FileReader.readFileFromCatalog<FileData>(
        "results",
        `${surveyId}.json`
      );

      for (let user of users) {
        if (mapUserRole(role as UserRole) === user.role) {
          for (let { id, answer } of user.questions) {
            apiResult[id] = (apiResult[id] || 0) + answer;
          }
        }
      }

      res.json(apiResult);
    } catch (e) {
      console.log(e);
    }
  }
);

router
  .route("/:surveyId")
  .get(async ({ params, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;
      const { id } = user;

      let isUserVoted = false;

      if (!surveyId) {
        throw new Error("Survey id is required");
      }

      const isFileExists = await FileReader.checkFileInCatalog(
        CATALOG,
        getFileName(surveyId)
      );

      const survey: SurveyDataBase = await Survey.findById(surveyId);

      if (isFileExists) {
        const { users } = await FileReader.readFileFromCatalog<FileData>(
          CATALOG,
          getFileName(surveyId)
        );

        isUserVoted = !!users.find((item) => item.id === id) || false;
      }

      res.json({ survey, isUserVoted });
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  .post(async ({ params, body, user }: AppRequest, res: Response) => {
    try {
      const { surveyId } = params;
      const { login, id, role } = user;
      let users: FileData["users"] = [];
      const survey = (await Survey.findById(surveyId)) as SurveyDataBase;

      const questionPromiseResult = await Promise.all<Question>(
        Object.keys(body).map((item) => QuestionModel.findById(item))
      );

      const questionFilePayload = questionPromiseResult.map(
        ({ id, description }) => ({ id, description, answer: body[id] })
      );

      const isFileExists = await FileReader.checkFileInCatalog(
        CATALOG,
        getFileName(surveyId)
      );

      if (isFileExists) {
        const fileData = await FileReader.readFileFromCatalog<FileData>(
          CATALOG,
          getFileName(surveyId)
        );
        users = [...fileData.users];
      }

      await FileReader.writeFileToCatalog(CATALOG, getFileName(surveyId), {
        title: survey.title,
        users: [...users, { id, login, role, questions: questionFilePayload }],
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
