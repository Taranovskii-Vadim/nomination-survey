export const firstLetterToUpperCase = (value: string): string => value[0].toUpperCase() + value.slice(1);

export const getItem = <T>(key: string): T => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
