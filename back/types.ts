import { Request } from "express";

export interface AppRequest extends Request {
  user: {
    id: string;
    surveysId: string[];
  };
}

export interface DecodedToken {
  id: string;
  login: string;
  surveysId: string[];
}
