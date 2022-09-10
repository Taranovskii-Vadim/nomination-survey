import { axiosInstance } from ".";
import { UserApiResponse } from "../store/user/types";
import { UserRoleDTO } from "../types";
import { setUserToStorage } from "../utils";
import { mapUserRole } from "../utils/api";
import { Route, Method } from "../routes/types";

interface ResponseDTO {
  id: string;
  token: string;
  role: UserRoleDTO;
}

class GetUserToken implements Route {
  method: Method = "GET";

  getUrl({ login }: { login: string }): string {
    return `/user/${login}`;
  }

  getData({ id, role, token }: ResponseDTO): UserApiResponse {
    axiosInstance.defaults.headers["token"] = token;
    const mappedRole = mapUserRole(role);
    setUserToStorage({ id, role: mappedRole, token });
    return { id, role: mappedRole };
  }
}

export default new GetUserToken();
