import { User } from 'src/store/user/types';

import { GET_PROFILE } from './constants';
import { Method, ResponseDTO, Route } from './types';

interface ResultDTO {
  fullname: string;
  role: User['role'];
}

class GetProfile implements Route {
  method: Method = 'GET';

  getUrl = (): string => GET_PROFILE;

  getData = ({ profile }: ResponseDTO<'profile', ResultDTO>): User => profile;
}

export default new GetProfile();
