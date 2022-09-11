import { Response, Router } from "express";

import FileModel from "../../models/FileModel";
import { FileData, SurveyCommonData } from "./types";

import { Request } from "../../types";
import { CATALOG } from "./constants";

const getFileName = (id: number): string => `${id}.json`;

const router = Router();

router.get("/", async ({ user }: Request, res: Response) => {
  try {
    const result = await FileModel.getData<SurveyCommonData[]>(
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

router.route("/:id").get(async ({ params, user }: Request, res: Response) => {
  try {
    const { id } = user;
    const surveyId = parseInt(params.id);

    let isUserVoted = false;

    if (!surveyId) {
      res.status(400).json({ message: "Inncorrect id type" });
    }

    const isFile = await FileModel.checkData(CATALOG, getFileName(surveyId));

    const surveys = await FileModel.getData<SurveyCommonData[]>(
      "database",
      "surveys.json"
    );

    const survey = surveys.find((item) => item.id === surveyId);

    if (isFile) {
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
});
// .post(async ({ params, body, user }: Request, res: Response) => {
//   try {
//     const surveyId = parseInt(params.surveyId);

//     const { login, id, role } = user;
//     let users: FileData["users"] = [];
//     const surveys = await FileModel.getData<SurveyCommonData[]>(
//       "database",
//       "surveys.json"
//     );

//     const questions = await FileModel.getData<Question[]>(
//       "database",
//       "questions.json"
//     );

//     const survey = surveys.find((item) => item.id === surveyId);

//     const questionPromiseResult = await Promise.all<Question>(
//       Object.keys(body).map((item) =>
//         questions.find((question) => question.id === item)
//       )
//     );

//     const questionFilePayload = questionPromiseResult.map(
//       ({ id, description }) => ({ id, description, answer: body[id] })
//     );

//     const isFileExists = await FileModel.checkData(
//       CATALOG,
//       getFileName(surveyId)
//     );

//     if (isFileExists) {
//       const fileData = await FileModel.getData<FileData>(
//         CATALOG,
//         getFileName(surveyId)
//       );
//       users = [...fileData.users];
//     }

//     await FileModel.writeData(CATALOG, getFileName(surveyId), {
//       title: survey.title,
//       users: [...users, { id, login, role, questions: questionFilePayload }],
//     });

//     res.json({});
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// })
// .put(async ({ params, body, user }: Request, res: Response) => {
//   try {
//     const surveyId = parseInt(params.surveyId);
//     const { nextStatus } = body;

//     const surveys = await FileModel.getData<SurveyCommonData[]>(
//       "database",
//       "surveys.json"
//     );

//     const updated = surveys.map((item) => {
//       if (item.id === surveyId) {
//         item.status = nextStatus;
//       }
//       return item;
//     });

//     await FileModel.writeData("database", "surveys.json", updated);

//     res.json({});
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

export default router;
