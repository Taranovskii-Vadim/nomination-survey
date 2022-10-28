import { SurveyStatus } from 'src/store/types';
import { UserRole } from 'src/store/user/types';

export const isHaveAccess = (role: UserRole, status: SurveyStatus): boolean => {
  if (role === 'admin') return true;

  if (role === 'chief' && status === 'chiefVote') return true;

  if (role === 'user' && status === 'userVote') return true;

  return false;
};
