export const formatData = <T extends unknown>(key: string, data?: T) => ({ [key]: data });

export const formatError = (message: string) => ({ error: { message } });
