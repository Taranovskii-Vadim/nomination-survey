import { Router } from "express";

import authRouter from "./auth";
import surveyRouter from "./survey";
import profileRouter from "./profile";
import questionRouter from "./question";

type Prefix = "surveys" | "questions" | "auth" | "profile";

// TODO add header and render fullname in front also create logout button
interface AppRouter {
  prefix: Prefix;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: "surveys", router: surveyRouter },
  { prefix: "profile", router: profileRouter },
  { prefix: "questions", router: questionRouter },
  { prefix: "auth", isAuth: false, router: authRouter },
];
