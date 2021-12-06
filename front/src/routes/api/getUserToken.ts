import { axiosInstance } from ".";
import { UserApiResponse } from "../../store/userStore/types";
import { UserRoleDTO } from "../../types";
import { mapUserRole } from "../../utils/api";
import { Route, Method } from "../types";

interface ResponseDTO {
  id: string;
  token: string;
  role: UserRoleDTO;
  surveysId: string[];
}

class GetUserToken implements Route {
  method: Method = "GET";

  getUrl({ login }: { login: string }): string {
    return `/user/${login}`;
  }

  getData({ id, role, token, surveysId }: ResponseDTO): UserApiResponse {
    axiosInstance.defaults.headers["token"] = token;
    return { id, surveysId, role: mapUserRole(role) };
  }
}

export default new GetUserToken();
