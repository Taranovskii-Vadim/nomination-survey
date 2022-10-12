import { Router } from "express";

import userRouter from "./user";
import surveyRouter from "./survey";
import questionRouter from "./question";

type Prefix = "surveys" | "questions" | "users";

interface AppRouter {
  prefix: Prefix;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: "surveys", router: surveyRouter },
  { prefix: "questions", router: questionRouter },
  { prefix: "users", isAuth: false, router: userRouter },
];
