export type UserRole = "user" | "chief" | "admin";

export interface UserApiResponse {
  id: string;
  role: UserRole;
}
