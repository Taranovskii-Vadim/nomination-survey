import { Question } from "../store/survey/types";
import { Route, Method } from "./types";

interface ResponseDTO {
  id: string;
  description: string;
}

class GetQuestionById implements Route {
  method: Method = "GET";

  getUrl(id: string): string {
    return `/question/${id}`;
  }

  getData(data: ResponseDTO): Question {
    return data;
  }
}

export default new GetQuestionById();
