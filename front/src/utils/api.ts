import { COMPARED_SURVEY_STATUS, COMPARED_USER_ROLE } from "../constants";
import { SurveyStatus, SurveyStatusDTO, UserRole, UserRoleDTO } from "../types";

export const switchKeysWithValues = (data: object): object => {
  const keys = Object.keys(data);

  return keys.reduce((acc, item) => {
    acc[data[item]] = item;
    return acc;
  }, {});
};

export const mapUserRole = (role: UserRoleDTO): UserRole => {
  const userRole = COMPARED_USER_ROLE[role];
  return userRole;
};

export const mapSurveyStatusForBack = (
  status: SurveyStatus
): SurveyStatusDTO => {
  const switched = switchKeysWithValues(COMPARED_SURVEY_STATUS);
  return switched[status];
};

export const mapSurveyStatus = (status: SurveyStatusDTO): SurveyStatus => {
  const surveyStatus = COMPARED_SURVEY_STATUS[status];
  return surveyStatus;
};
