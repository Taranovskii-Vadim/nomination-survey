import { Request as ExpressRequest } from "express";

export type UserRole = "admin" | "chief" | "user";

export interface User {
  id: number;
  login: string;
  role: UserRole;
}

export interface Request extends ExpressRequest {
  user: User;
}
