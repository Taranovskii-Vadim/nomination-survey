import { Response, Router } from "express";

import FileModel from "../models/FileModel";
import { FileData, SurveyDataBase } from "../models/Survey/types";

import { Request, UserRole } from "../types";
import { Question } from "../models/Question/types";

const CATALOG = "results";

const getFileName = (id: string): string => `${id}.json`;

const router = Router();

router.get("/", async ({ user }: Request, res: Response) => {
  try {
    const result = await FileModel.getData<SurveyDataBase[]>(
      "database",
      "surveys.json"
    );

    res.json(result.map(({ id, title, status }) => ({ id, title, status })));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// router.get(
//   "/results/:role/:surveyId",
//   async ({ params }: Request, res: Response) => {
//     try {
//       const apiResult = {};
//       const { surveyId, role } = params;

//       const isFileExists = await FileModel.checkData(
//         CATALOG,
//         getFileName(surveyId)
//       );

//       if (isFileExists) {
//         const { users } = await FileModel.getData<FileData>(
//           CATALOG,
//           getFileName(surveyId)
//         );

//         for (let user of users) {
//           if (mapUserRole(role as UserRole) === user.role) {
//             for (let { id, answer } of user.questions) {
//               apiResult[id] = (apiResult[id] || 0) + answer;
//             }
//           }
//         }
//       }

//       res.json(apiResult);
//     } catch (e) {
//       console.log(e);
//     }
//   }
// );

router
  .route("/:surveyId")
  .get(async ({ params, user }: Request, res: Response) => {
    try {
      const { surveyId } = params;
      const { id } = user;

      let isUserVoted = false;

      if (!surveyId) {
        throw new Error("Survey id is required");
      }

      const isFileExists = await FileModel.checkData(
        CATALOG,
        getFileName(surveyId)
      );

      const surveys = await FileModel.getData<SurveyDataBase[]>(
        "database",
        "surveys.json"
      );

      const survey: SurveyDataBase = surveys.find(
        (item) => item.id === surveyId
      );

      if (isFileExists) {
        const { users } = await FileModel.getData<FileData>(
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
  .post(async ({ params, body, user }: Request, res: Response) => {
    try {
      const { surveyId } = params;
      const { login, id, role } = user;
      let users: FileData["users"] = [];
      const surveys = await FileModel.getData<SurveyDataBase[]>(
        "database",
        "surveys.json"
      );

      const questions = await FileModel.getData<Question[]>(
        "database",
        "questions.json"
      );

      const survey = surveys.find((item) => item.id === surveyId);

      const questionPromiseResult = await Promise.all<Question>(
        Object.keys(body).map((item) =>
          questions.find((question) => question.id === item)
        )
      );

      const questionFilePayload = questionPromiseResult.map(
        ({ id, description }) => ({ id, description, answer: body[id] })
      );

      const isFileExists = await FileModel.checkData(
        CATALOG,
        getFileName(surveyId)
      );

      if (isFileExists) {
        const fileData = await FileModel.getData<FileData>(
          CATALOG,
          getFileName(surveyId)
        );
        users = [...fileData.users];
      }

      await FileModel.writeData(CATALOG, getFileName(surveyId), {
        title: survey.title,
        users: [...users, { id, login, role, questions: questionFilePayload }],
      });

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  })
  .put(async ({ params, body, user }: Request, res: Response) => {
    try {
      const { surveyId } = params;
      const { nextStatus } = body;

      const surveys = await FileModel.getData<SurveyDataBase[]>(
        "database",
        "surveys.json"
      );

      const updated = surveys.map((item) => {
        if (item.id === surveyId) {
          item.status = nextStatus;
        }
        return item;
      });

      await FileModel.writeData("database", "surveys.json", updated);

      res.json({});
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

export default router;
