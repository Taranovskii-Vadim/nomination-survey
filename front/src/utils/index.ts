import { TOKEN_KEY } from "../constants";
import { UserFromStorage } from "../store/userStore/types";
import { SurveyStatus, UserRole } from "../types";

export const getUserFromStorage = (): UserFromStorage | null => {
  const result = localStorage.getItem(TOKEN_KEY);

  if (result) {
    const userResult = JSON.parse(result) as UserFromStorage;
    return userResult;
  }

  return null;
};

export const getLoadingMessage = (subject: string): string =>
  `Загрузка ${subject}...`;

export const setUserToStorage = ({
  id,
  role,
  token,
  surveysId,
}: UserFromStorage): void => {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ id, role, token, surveysId })
  );
};

export const isHaveAccess = (role: UserRole, status: SurveyStatus): boolean => {
  if (role === "admin") return true;
  if (role === "chief" && status === "chiefVote") return true;
  if (role === "user" && status === "userVote") return true;

  return false;
};

export const firstLetterToUpperCase = (value: string): string =>
  value[0].toUpperCase() + value.slice(1);
