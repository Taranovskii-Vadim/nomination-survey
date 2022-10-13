import { TOKEN_KEY } from "../constants";
import { UserFromStorage } from "../store/user/types";

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

export const firstLetterToUpperCase = (value: string): string =>
  value[0].toUpperCase() + value.slice(1);
