export const getLoadingMessage = (subject: string): string =>
  `Загрузка ${subject}...`;

export const firstLetterToUpperCase = (value: string): string =>
  value[0].toUpperCase() + value.slice(1);
