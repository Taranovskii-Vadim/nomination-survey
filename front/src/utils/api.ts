import {
  OptionTypeFromServer,
  RoleFromServer,
  SurveyStatusFromServer,
} from "../routes/api/types";
import { OptionType } from "../store/surveyStore/types";
import { SurveyStatus } from "../store/types";
import { UserRole } from "../store/userStore/types";

const comparedRoles: { [key in RoleFromServer]: UserRole } = {
  admin: "admin",
  ordinaryUser: "user",
  generalUser: "chief",
};

const comparedOptionTypes: { [key in OptionTypeFromServer]: OptionType } = {
  short: "shortAnswer",
  long: "longAnswer",
};

const comparedStatuses: { [key in SurveyStatusFromServer]: SurveyStatus } = {
  notReady: "notStarted",
  userVote: "userVote",
  chiefVote: "chiefVote",
  closed: "finished",
};

export const mapUserRole = (role: RoleFromServer): UserRole => {
  const userRole = comparedRoles[role];
  return userRole;
};

export const mapSurveyStatus = (
  status: SurveyStatusFromServer
): SurveyStatus => {
  const surveyStatus = comparedStatuses[status];
  return surveyStatus;
};

export const mapSurveyOptionType = (
  optionType: OptionTypeFromServer
): OptionType => {
  const type = comparedOptionTypes[optionType];
  return type;
};
