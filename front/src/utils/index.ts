import { SURVEY_STATUS, USER_ROLE } from "../store/constants";
import { SurveyStatus, UserRole } from "../store/types";

export const isHaveAccess = (role: UserRole, status: SurveyStatus): boolean => {
  if (role === USER_ROLE.admin) return true;
  if (role === USER_ROLE.chief && status === SURVEY_STATUS.chiefVote)
    return true;
  if (role === USER_ROLE.user && status === SURVEY_STATUS.userVote) return true;

  return false;
};
