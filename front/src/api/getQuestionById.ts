import { Question } from "../store/survey/types";
import { Route, Method, ResponseDTO } from "./types";

interface ResultDTO {
  id: number;
  text: string;
}

class GetQuestionById implements Route {
  method: Method = "GET";

  getUrl = (id: string): string => `/questions/${id}`;

  getData = ({ result }: ResponseDTO<ResultDTO>): Question => result;
}

export default new GetQuestionById();
