import { Response, Router } from 'express';

import { Request } from '../../types';

import { formatData } from '../helpers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { fullname, role } = req.user;

  return res.json(formatData({ fullname, role }));
});

export default router;
