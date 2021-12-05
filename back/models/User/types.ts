type UserRole = "user" | "chief" | "admin";

export interface User {
  readonly id: string;
  login: string;
  role: UserRole;
  surveysId: number[];
}
