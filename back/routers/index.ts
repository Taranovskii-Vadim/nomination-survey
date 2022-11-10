import { Router } from 'express';

import authRouter from './auth';
import surveyRouter from './survey';
import profileRouter from './profile';

type Prefix = 'surveys' | 'questions' | 'auth' | 'profile';

interface AppRouter {
  prefix: Prefix;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: 'surveys', router: surveyRouter },
  { prefix: 'profile', router: profileRouter },
  { prefix: 'auth', isAuth: false, router: authRouter },
];
