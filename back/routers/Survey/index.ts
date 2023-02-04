import { Response, Router } from 'express';

import { database } from '../../db';

import FileModel from '../../models/FileModel';
import { Request, RequestWithId } from '../../types';

import { formatData, formatError } from '../helpers';

import { Survey, FileData, Question, GetResultsRequest, SaveResultsRequest, ChangeStatusRequest } from './types';

const router = Router();

const getResultFileName = (id: number): string => `survey${id}`;

router.get('/', async (r: Request, res: Response) => {
  try {
    const { rows } = await database.query<Survey>('SELECT * FROM surveys');

    const result = rows.map(({ id, title, status }) => ({ id, title, status }));

    return res.json(formatData('surveys', result));
  } catch (e) {
    return res.status(500).json(formatError(e.message));
  }
});

router.get('/results/:role/:id', async ({ params }: GetResultsRequest, res: Response) => {
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

    return res.json(formatData('chart', apiResult));
  } catch (e) {
    return res.status(500).json(formatError(e.message));
  }
});

router
  .route('/:id')
  .get(async ({ params, user }: RequestWithId, res: Response) => {
    try {
      const { id } = user;
      let isUserVoted = false;
      const surveyId = parseInt(params.id);

      if (!surveyId) {
        return res.status(400).json(formatError('Inncorrect id type'));
      }

      const { rows: surveysDB } = await database.query<Survey>('SELECT * FROM surveys where id=$1', [surveyId]);

      const fileData = await FileModel.getData<FileData>(getResultFileName(surveyId));

      if (!surveysDB.length) {
        return res.status(404).json(formatError('Survey not found'));
      }

      const { rows: questionsDB } = await database.query<Question>('SELECT * FROM questions');

      const questions = surveysDB[0].questions.map((id) => questionsDB.find((item) => item.id === id)).filter(Boolean);

      const survey: Survey<Question> = { ...surveysDB[0], questions };

      if (fileData) {
        isUserVoted = !!fileData.users.find((item) => item.id === id) || false;
      }

      return res.json({ survey, isUserVoted });
    } catch (e) {
      return res.status(500).json(formatError(e.message));
    }
  })
  .post(async ({ params, body, user }: SaveResultsRequest, res: Response) => {
    try {
      const { login, id, role } = user;
      let users: FileData['users'] = [];
      const surveyId = parseInt(params.id);

      const questions = await FileModel.getData<Question[]>('questions');
      const surveys = await FileModel.getData<Survey[]>('surveys');

      const survey = surveys.find((item) => item.id === surveyId);

      const questionPromiseResult = await Promise.all<Question>(
        Object.keys(body).map((item) => questions.find((question) => question.id === parseInt(item))),
      );

      const questionFilePayload = questionPromiseResult.map(({ id, text }) => ({
        id,
        text,
        answer: body[id],
      }));

      const fileData = await FileModel.getData<FileData>(getResultFileName(surveyId));

      if (fileData) {
        users = [...fileData.users];
      }

      await FileModel.setData(getResultFileName(surveyId), {
        title: survey.title,
        users: [...users, { id, login, role, questions: questionFilePayload }],
      });

      return res.json();
    } catch (e) {
      return res.status(500).json(formatError(e.message));
    }
  })
  .put(async ({ params, body }: ChangeStatusRequest, res: Response) => {
    try {
      const { status } = body;
      const surveyId = parseInt(params.id);

      const surveys = await FileModel.getData<Survey[]>('surveys');

      const updated = surveys.map((item) => {
        if (item.id === surveyId) {
          item.status = status;
        }
        return item;
      });

      await FileModel.setData('surveys', updated);

      return res.json(formatData('newStatus', status));
    } catch (e) {
      return res.status(500).json(formatError(e.message));
    }
  });

export default router;
