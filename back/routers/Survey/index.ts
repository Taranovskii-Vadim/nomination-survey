import { Response, Router } from 'express';

import { database } from '../../db';

import ResultModel from '../../models/ResultModel';
import { Request, RequestWithId } from '../../types';

import { formatData, formatError } from '../helpers';

import { Survey, FileData, Question, GetResultsRequest, SaveResultsRequest, ChangeStatusRequest } from './types';

const router = Router();

router.get('/', async (r: Request, res: Response) => {
  try {
    const { rows } = await database.query<Survey>('SELECT * FROM surveys');

    const result = rows.map(({ id, title, status }) => ({ id, title, status })).sort((a, b) => a.id - b.id);

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

    const fileData = await ResultModel.getData<FileData>(id);

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

      const fileData = await ResultModel.getData<FileData>(surveyId);

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

      const { rows: questionsDB } = await database.query<Question>('SELECT * FROM questions');
      const { rows: surveysDB } = await database.query<Survey>('SELECT * FROM surveys where id=$1', [surveyId]);

      const questions = Object.keys(body).map((key) => {
        const question = questionsDB.find((item) => item.id === parseInt(key));

        return { ...question, answer: body[key] };
      });

      const fileData = await ResultModel.getData<FileData>(surveyId);

      if (fileData) {
        users = [...fileData.users];
      }

      await ResultModel.setData(surveyId, {
        title: surveysDB[0].title,
        users: [...users, { id, login, role, questions }],
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

      await database.query('UPDATE surveys SET status=$1 WHERE id=$2', [status, surveyId]);

      return res.json(formatData('newStatus', status));
    } catch (e) {
      return res.status(500).json(formatError(e.message));
    }
  });

export default router;
