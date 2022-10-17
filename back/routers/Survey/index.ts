import { Response, Router } from "express";

import { Question } from "../question/types";
import FileModel from "../../models/FileModel";
import { Request, RequestWithId } from "../../types";

import { formatData, formatError } from "../helpers";

import {
  FileData,
  SurveyCommonData,
  GetResultsRequest,
  SaveResultsRequest,
  ChangeStatusRequest,
} from "./types";

const router = Router();

const getResultFileName = (id: number): string => `survey${id}`;

router.get("/", async (r: Request, res: Response) => {
  try {
    const result = await FileModel.getData<SurveyCommonData[]>("surveys");

    res.json(formatData(result));
  } catch (e) {
    res.status(500).json(formatError(e.message));
  }
});

router.get(
  "/results/:role/:id",
  async ({ params }: GetResultsRequest, res: Response) => {
    try {
      const apiResult = {};
      const { role } = params;
      const id = parseInt(params.id);

      const fileData = await FileModel.getData<FileData>(getResultFileName(id));

      if (fileData) {
        for (let user of fileData.users) {
          if (role === user.role) {
            for (let { id, answer } of user.questions) {
              apiResult[id] = (apiResult[id] || 0) + answer;
            }
          }
        }
      }

      res.json(formatData(apiResult));
    } catch (e) {
      res.status(500).json(formatError(e.message));
    }
  }
);

router
  .route("/:id")
  .get(async ({ params, user }: RequestWithId, res: Response) => {
    try {
      const { id } = user;
      let isUserVoted = false;
      const surveyId = parseInt(params.id);

      if (!surveyId) {
        res.status(400).json(formatError("Inncorrect id type"));
      }

      const fileData = await FileModel.getData<FileData>(
        getResultFileName(surveyId)
      );
      const surveys = await FileModel.getData<SurveyCommonData[]>("surveys");

      const survey = surveys.find((item) => item.id === surveyId);

      if (fileData) {
        isUserVoted = !!fileData.users.find((item) => item.id === id) || false;
      }

      res.json(formatData({ survey, isUserVoted }));
    } catch (e) {
      res.status(500).json(formatError(e.message));
    }
  })
  .post(async ({ params, body, user }: SaveResultsRequest, res: Response) => {
    try {
      const { login, id, role } = user;
      let users: FileData["users"] = [];
      const surveyId = parseInt(params.id);

      const questions = await FileModel.getData<Question[]>("questions");
      const surveys = await FileModel.getData<SurveyCommonData[]>("surveys");

      const survey = surveys.find((item) => item.id === surveyId);

      const questionPromiseResult = await Promise.all<Question>(
        Object.keys(body).map((item) =>
          questions.find((question) => question.id === parseInt(item))
        )
      );

      const questionFilePayload = questionPromiseResult.map(({ id, text }) => ({
        id,
        text,
        answer: body[id],
      }));

      const fileData = await FileModel.getData<FileData>(
        getResultFileName(surveyId)
      );

      if (fileData) {
        users = [...fileData.users];
      }

      await FileModel.setData(getResultFileName(surveyId), {
        title: survey.title,
        users: [...users, { id, login, role, questions: questionFilePayload }],
      });

      res.json(formatData());
    } catch (e) {
      res.status(500).json(formatError(e.message));
    }
  })
  .put(async ({ params, body }: ChangeStatusRequest, res: Response) => {
    try {
      const { status } = body;
      const surveyId = parseInt(params.id);

      const surveys = await FileModel.getData<SurveyCommonData[]>("surveys");

      const updated = surveys.map((item) => {
        if (item.id === surveyId) {
          item.status = status;
        }
        return item;
      });

      await FileModel.setData("surveys", updated);

      res.json(formatData());
    } catch (e) {
      res.status(500).json(formatError(e.message));
    }
  });

export default router;
