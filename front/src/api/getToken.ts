import { Route, Method } from "./types";

class GetUserToken implements Route {
  method: Method = "GET";

  getUrl = (login) => `/users/${login}`;
}

export default new GetUserToken();
