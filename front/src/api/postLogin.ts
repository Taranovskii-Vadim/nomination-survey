import { Route, Method } from "./types";

// // TODO create common template
// // TODO add unit tests for this project

class PostLogin implements Route {
  method: Method = "POST";

  getUrl = (login) => `/auth/${login}`;
}

export default new PostLogin();
