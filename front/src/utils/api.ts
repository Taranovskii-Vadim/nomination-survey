import { RoleFromServer, SurveyStatusFromServer } from "../routes/api/types";
import { SurveyFrontStatus } from "../store/types";
import { UserRole } from "../store/userStore/types";

const comparedRoles: { [key in RoleFromServer]: UserRole } = {
  admin: "admin",
  ordinaryUser: "user",
  generalUser: "chief",
};

const comparedStatuses: { [key in SurveyStatusFromServer]: SurveyFrontStatus } =
  {
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
): SurveyFrontStatus => {
  const surveyStatus = comparedStatuses[status];
  return surveyStatus;
};
