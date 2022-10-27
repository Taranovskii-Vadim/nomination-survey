import { Route, Method } from './types';

// TODO add unit tests for this project
// TODO add eslint, husky and lint staged
// TODO run prettier on pre-commit

class PostLogin implements Route {
  method: Method = 'POST';

  getUrl = (login: string) => `/auth/${login}`;
}

export default new PostLogin();
