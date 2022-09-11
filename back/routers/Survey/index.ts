import { Response, Router } from "express";

import FileModel from "../../models/FileModel";
import { FileData, SurveyCommonData } from "./types";

import { Request } from "../../types";
import { Question } from "../question/types";

const getFileName = (id: number): string => `${id}.json`;

const router = Router();

router.get("/", async ({ user }: Request, res: Response) => {
  try {
    const result = await FileModel.getData<SurveyCommonData[]>("surveys.json");

    res.json(result.map(({ id, title, status }) => ({ id, title, status })));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/results/:role/:id", async ({ params }: Request, res: Response) => {
  try {
    const apiResult = {};
    const id = parseInt(params.id);
    const { role } = params;

    const isFile = await FileModel.checkData(getFileName(id));

    if (isFile) {
      const { users } = await FileModel.getData<FileData>(getFileName(id));

      for (let user of users) {
        if (role === user.role) {
          for (let { id, answer } of user.questions) {
            apiResult[id] = (apiResult[id] || 0) + answer;
          }
        }
      }
    }

    res.json(apiResult);
  } catch (e) {
    console.log(e);
  }
});

router
  .route("/:id")
  .get(async ({ params, user }: Request, res: Response) => {
    try {
      const { id } = user;
      const surveyId = parseInt(params.id);

      let isUserVoted = false;

      if (!surveyId) {
        res.status(400).json({ message: "Inncorrect id type" });
      }

      const isFile = await FileModel.checkData(getFileName(surveyId));

      const surveys = await FileModel.getData<SurveyCommonData[]>(
        "surveys.json"
      );

      const survey = surveys.find((item) => item.id === surveyId);

      if (isFile) {
        const { users } = await FileModel.getData<FileData>(
          getFileName(surveyId)
        );

        isUserVoted = !!users.find((item) => item.id === id) || false;
      }

      res.json({ survey, isUserVoted });
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  .post(async ({ params, body, user }: Request, res: Response) => {
    try {
      const surveyId = parseInt(params.id);

      const { login, id, role } = user;
      let users: FileData["users"] = [];
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

      const isFileExists = await FileModel.checkData(getFileName(surveyId));

      if (isFileExists) {
        const fileData = await FileModel.getData<FileData>(
          getFileName(surveyId)
        );
        users = [...fileData.users];
      }

      await FileModel.writeData(getFileName(surveyId), {
        title: survey.title,
        users: [...users, { id, login, role, questions: questionFilePayload }],
      });

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  .put(async ({ params, body }: Request, res: Response) => {
    try {
      const surveyId = parseInt(params.id);
      const { status } = body;

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
