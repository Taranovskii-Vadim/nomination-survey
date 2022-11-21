import { UserRole } from 'src/store/user/types';

import { GET_PROFILE } from './constants';
import { Method, ResponseDTO, Route } from './types';

class GetUserRole implements Route {
  method: Method = 'GET';

  getUrl = (): string => GET_PROFILE;

  getData = ({ userRole }: ResponseDTO<'userRole', UserRole>): UserRole => userRole;
}

export default new GetUserRole();
