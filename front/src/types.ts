import {
  COMPARED_QUESTION_TYPE,
  COMPARED_SURVEY_STATUS,
  COMPARED_USER_ROLE,
} from "./constants";

export type SurveyStatusDTO = keyof typeof COMPARED_SURVEY_STATUS;

export type SurveyStatus =
  typeof COMPARED_SURVEY_STATUS[keyof typeof COMPARED_SURVEY_STATUS];

export type UserRoleDTO = keyof typeof COMPARED_USER_ROLE;

export type UserRole =
  typeof COMPARED_USER_ROLE[keyof typeof COMPARED_USER_ROLE];

export type QuestionType =
  typeof COMPARED_QUESTION_TYPE[keyof typeof COMPARED_QUESTION_TYPE];

export type QuestionTypeDTO = keyof typeof COMPARED_QUESTION_TYPE;
