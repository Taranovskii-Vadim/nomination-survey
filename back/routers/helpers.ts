export const formatData = <T extends unknown>(result?: T) => ({ result });

export const formatError = (message: string) => ({ error: { message } });
