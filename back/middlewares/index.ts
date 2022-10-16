import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { Request } from "../types";

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies && req.cookies.token;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_KEY) as Request["user"];
    req.user = decoded;
    return next();
  }

  // TODO add status for expire session
  res.status(401).json();
};
