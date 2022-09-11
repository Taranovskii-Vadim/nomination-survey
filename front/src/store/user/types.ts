export type UserRole = "admin" | "chief" | "user";

export interface User {
  id: number;
  role: UserRole;
}

export interface UserFromStorage extends User {
  token: string;
}
