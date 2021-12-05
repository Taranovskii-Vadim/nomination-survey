import { SURVEY_STATUS, USER_ROLE } from "./constants";

export type SurveyStatus = keyof typeof SURVEY_STATUS;

export type UserRole = keyof typeof USER_ROLE;
