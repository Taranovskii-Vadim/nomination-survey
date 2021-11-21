import { axiosInstance } from ".";
import { UserApiResponse } from "../../store/userStore/types";
import { mapUserRole } from "../../utils/api";
import { Method, RoleFromServer, Route } from "./types";

interface ResponseDTO {
  id: string;
  token: string;
  role: RoleFromServer;
}

class GetUserToken implements Route {
  method: Method = "GET";

  getUrl({ login }: { login: string }): string {
    return `/user/${login}`;
  }

  getData({ id, role, token }: ResponseDTO): UserApiResponse {
    axiosInstance.defaults.headers["token"] = token;
    return { id, role: mapUserRole(role) };
  }
}

export default new GetUserToken();
