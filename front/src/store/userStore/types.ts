import { UserRole } from "../../types";

export interface UserApiResponse {
  id: string;
  role: UserRole;
  surveysId: string[];
}

export interface UserFromStorage extends UserApiResponse {
  token: string;
}
