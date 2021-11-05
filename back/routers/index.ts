import { Router } from "express";

import userRouter from "./userRouter";
import surveyRouter from "./surveyRouter";

interface AppRouter {
  prefix: string;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: "/user", isAuth: false, router: userRouter },
  { prefix: "/survey", router: surveyRouter },
];
