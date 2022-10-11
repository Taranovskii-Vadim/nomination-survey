import { Response, Router } from "express";

import { Request, RequestWithId } from "../../types";
import { Question } from "../question/types";
import FileModel from "../../models/FileModel";

import { getResultFileName } from "./helpers";
import { FileData, GetResultsRequest, SurveyCommonData } from "./types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await FileModel.getData<SurveyCommonData[]>("surveys.json");

    res.json(result);
  } catch (e) {
    res.status(500).send(e.message);
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

      res.json(apiResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

router
  .route("/:id")
  .get(async ({ params, user }: RequestWithId, res: Response) => {
    try {
      const { id } = user;
      const surveyId = parseInt(params.id);

      let isUserVoted = false;

      if (!surveyId) {
        res.status(400).json({ message: "Inncorrect id type" });
      }

      const fileData = await FileModel.getData<FileData>(
        getResultFileName(surveyId)
      );

      const surveys = await FileModel.getData<SurveyCommonData[]>(
        "surveys.json"
      );

      const survey = surveys.find((item) => item.id === surveyId);

      if (fileData) {
        isUserVoted = !!fileData.users.find((item) => item.id === id) || false;
      }

      res.json({ survey, isUserVoted });
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  // TODO add type for body
  .post(async ({ params, body, user }: RequestWithId, res: Response) => {
    try {
      const { login, id, role } = user;
      let users: FileData["users"] = [];
      const surveyId = parseInt(params.id);

      const surveys = await FileModel.getData<SurveyCommonData[]>(
        "surveys.json"
      );

      const questions = await FileModel.getData<Question[]>("questions.json");

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

      await FileModel.writeData(getResultFileName(surveyId), {
        title: survey.title,
        users: [...users, { id, login, role, questions: questionFilePayload }],
      });

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  // TODO add type for body
  .put(async ({ params, body }: RequestWithId, res: Response) => {
    try {
      const { status } = body;
      const surveyId = parseInt(params.id);

      const surveys = await FileModel.getData<SurveyCommonData[]>(
        "surveys.json"
      );

      const updated = surveys.map((item) => {
        if (item.id === surveyId) {
          item.status = status;
        }
        return item;
      });

      await FileModel.writeData("surveys.json", updated);

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

export default router;
