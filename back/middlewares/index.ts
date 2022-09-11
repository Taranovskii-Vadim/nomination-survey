import jwt from "jsonwebtoken";
import { NextFunction } from "express";

import { Request } from "../types";

export const authMiddleWare = (req: Request, r, next: NextFunction) => {
  const token = req.headers.token as string;
  const decoded = jwt.verify(token, process.env.JWT_KEY) as Request["user"];

  if (decoded) {
    req.user = decoded;
    next();
  }
};
