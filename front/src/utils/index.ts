import { SurveyStatus, UserRole } from "../types";

// TODO think about one source of true,because if we change role we have 2 places
export const isHaveAccess = (role: UserRole, status: SurveyStatus): boolean => {
  if (role === "admin") return true;
  if (role === "chief" && status === "chiefVote") return true;
  if (role === "user" && status === "userVote") return true;

  return false;
};

export const firstLetterToUpperCase = (value: string): string =>
  value[0].toUpperCase() + value.slice(1);
