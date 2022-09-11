import { Router } from "express";

import userRouter from "./user";
import surveyRouter from "./survey";
import questionRouter from "./question";

interface AppRouter {
  prefix: string;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: "/surveys", router: surveyRouter },
  { prefix: "/questions", router: questionRouter },
  { prefix: "/users", isAuth: false, router: userRouter },
];
