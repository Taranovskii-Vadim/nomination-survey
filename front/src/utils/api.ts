import {
  COMPARED_QUESTION_TYPE,
  COMPARED_SURVEY_STATUS,
  COMPARED_USER_ROLE,
} from "../constants";
import {
  QuestionTypeDTO,
  SurveyStatus,
  SurveyStatusDTO,
  UserRole,
  UserRoleDTO,
} from "../types";
import { OptionType } from "../store/surveyStore/types";

export const mapUserRole = (role: UserRoleDTO): UserRole => {
  const userRole = COMPARED_USER_ROLE[role];
  return userRole;
};

export const mapSurveyStatus = (status: SurveyStatusDTO): SurveyStatus => {
  const surveyStatus = COMPARED_SURVEY_STATUS[status];
  return surveyStatus;
};

export const mapSurveyOptionType = (
  optionType: QuestionTypeDTO
): OptionType => {
  const type = COMPARED_QUESTION_TYPE[optionType];
  return type;
};
