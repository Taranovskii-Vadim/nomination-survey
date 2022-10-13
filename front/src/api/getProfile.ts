import { User } from "src/store/user/types";
import { Method, Route } from "./types";

interface ResponseDTO {
  fullname: string;
  role: User["role"];
}

class GetProfile implements Route {
  method: Method = "GET";

  getUrl = () => "/profile";

  getData = (data: ResponseDTO): User => data;
}

export default new GetProfile();
