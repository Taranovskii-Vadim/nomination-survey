import { Response, Router } from 'express';

import { Request } from '../../types';

import { formatData } from '../helpers';

const router = Router();

router.get('/', ({ user: { role } }: Request, res: Response) => res.json(formatData('userRole', role)));

export default router;
