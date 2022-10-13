import { Request as ExpressRequest } from "express";

export type UserRole = "admin" | "chief" | "user";

export interface User {
  id: number;
  login: string;
  fullname: string;
  role: UserRole;
}

export interface Request<P = any, B = any> extends ExpressRequest<P, any, B> {
  user: User;
}

export interface RequestWithId<B = any>
  extends ExpressRequest<{ id: string }, any, B> {
  user: User;
}
