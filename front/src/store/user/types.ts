import { UserRole } from "../../types";

export interface UserApiResponse {
  id: string;
  role: UserRole;
}

export interface UserFromStorage extends UserApiResponse {
  token: string;
}
