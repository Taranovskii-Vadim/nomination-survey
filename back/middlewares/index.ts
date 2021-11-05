import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { AppRequest, DecodedToken } from "../types";

export const authMiddleWare = (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token as string;
  const decoded = jwt.verify(token, process.env.JWT_KEY) as DecodedToken;

  if (decoded) {
    req.userId = decoded.id;
    next();
  }
};
