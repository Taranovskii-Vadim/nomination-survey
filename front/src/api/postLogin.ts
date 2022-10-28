import { Route, Method } from './types';

// TODO add unit tests for this project

class PostLogin implements Route {
  method: Method = 'POST';

  getUrl = (login: string) => `/auth/${login}`;
}

export default new PostLogin();
