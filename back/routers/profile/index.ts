import { Response, Router } from 'express';

import { Request } from '../../types';

import { formatData } from '../helpers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { fullname, role } = req.user;
  // TODO we dont need fullname in front
  return res.json(formatData('profile', { fullname, role }));
});

export default router;
