import { axiosInstance } from ".";

import { User } from "../store/user/types";
import { setUserToStorage } from "../utils";
import { Route, Method } from "./types";

interface ResponseDTO {
  id: number;
  login: string;
  token: string;
  role: User["role"];
}

class GetUserToken implements Route {
  method: Method = "GET";

  getUrl(login): string {
    return `/user/${login}`;
  }

  getData({ id, role, token }: ResponseDTO): User {
    axiosInstance.defaults.headers["token"] = token;

    setUserToStorage({ id, role, token });

    return { id, role };
  }
}

export default new GetUserToken();
