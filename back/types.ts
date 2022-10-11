import { Request as ExpressRequest } from "express";

export type UserRole = "admin" | "chief" | "user";

export interface User {
  id: number;
  login: string;
  role: UserRole;
}

export interface Request<P = any> extends ExpressRequest<P> {
  user: User;
}

export interface RequestWithId extends ExpressRequest<{ id: string }> {
  user: User;
}
