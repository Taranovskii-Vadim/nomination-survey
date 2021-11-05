type UserRole = "user" | "chief" | "admin";

// TODO check if login correct
export interface User {
  readonly id: string;
  login: string;
  // TODO maybe think about permissions
  role: UserRole;
  // TODO lookup field in mongoDB
  surveysId: number[];
}
