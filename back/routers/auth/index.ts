import jwt from 'jsonwebtoken';
import { Response, Request, Router } from 'express';

import { database } from '../../db';
import { formatError } from '../helpers';

const router = Router();

// 5 min
const maxAge = 300000;
// 1 min
// const maxAge = 60000;

router.post('/:login', async ({ params }: Request<{ login: string }>, res: Response) => {
  try {
    const { login } = params;

    const { rows } = await database.query('SELECT * FROM users where login=$1', [login]);

    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign(rows[0], process.env.JWT_KEY);

    return res.cookie('token', token, { maxAge }).json();
  } catch (e) {
    return res.status(500).json(formatError(e.message));
  }
});

export default router;
