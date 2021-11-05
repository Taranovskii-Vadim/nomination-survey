import { Request } from "express";

export interface AppRequest extends Request {
  userId: string;
}

export interface DecodedToken {
  id: string;
  login: string;
}
