export const getErrorMessageWithId = (
  field: string,
  id: number | string
): string => `Error trying to receive ${field} with id=${id}`;

export const TOKEN_KEY = "token";

export const COMPARED_QUESTION_TYPE = {
  short: "shortAnswer",
  long: "longAnswer",
} as const;

export const COMPARED_SURVEY_STATUS = {
  notStarted: "notStarted",
  userVoting: "userVote",
  chiefVoting: "chiefVote",
  finished: "finished",
} as const;

export const COMPARED_USER_ROLE = {
  ordinaryUser: "user",
  generalUser: "chief",
  admin: "admin",
} as const;
