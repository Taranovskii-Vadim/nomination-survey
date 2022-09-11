import { Router } from "express";

import userRouter from "./userRouter";
import surveyRouter from "./Survey";
import questionRouter from "./Question";

interface AppRouter {
  prefix: string;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: "/users", isAuth: false, router: userRouter },
  { prefix: "/surveys", router: surveyRouter },
  { prefix: "/questions", router: questionRouter },
];
