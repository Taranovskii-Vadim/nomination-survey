import { POST_LOGIN } from './constants';
import { Route, Method } from './types';

class PostLogin implements Route {
  method: Method = 'POST';

  getUrl = (login: string): string => `${POST_LOGIN}/${login}`;
}

export default new PostLogin();
