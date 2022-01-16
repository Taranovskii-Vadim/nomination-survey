export type UserRole = "user" | "chief" | "admin";

export type UserRoleDB = "admin" | "ordinaryUser" | "generalUser";

export interface User {
  readonly id: string;
  login: string;
  role: UserRoleDB;
}
