export const getErrorMessageWithId = (
  field: string,
  id: number | string
): string => `Error trying to receive ${field} with id=${id}`;
