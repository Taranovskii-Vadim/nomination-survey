import { User } from "src/store/user/types";
import { Method, ResponseDTO, Route } from "./types";

interface ResultDTO {
  fullname: string;
  role: User["role"];
}

class GetProfile implements Route {
  method: Method = "GET";

  getUrl = () => "/profile";

  getData = ({ result }: ResponseDTO<ResultDTO>): User => result;
}

export default new GetProfile();
