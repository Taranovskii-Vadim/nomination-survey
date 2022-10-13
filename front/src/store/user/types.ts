export type UserRole = "admin" | "chief" | "user";

export interface User {
  fullname: string;
  role: UserRole;
}
