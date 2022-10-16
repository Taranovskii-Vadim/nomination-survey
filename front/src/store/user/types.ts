export type UserRole = "admin" | "chief" | "user";

export interface SignInFormValues {
  login: string;
}

export interface User {
  fullname: string;
  role: UserRole;
}
