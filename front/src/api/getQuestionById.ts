import { Question } from "../store/surveyStore/types";
import { Route, Method } from "../routes/types";

interface ResponseDTO {
  id: string;
  description: string;
}

class GetQuestionById implements Route {
  method: Method = "GET";

  getUrl({ id }: { id: string }): string {
    return `/question/${id}`;
  }

  getData(data: ResponseDTO): Question {
    return data;
  }
}

export default new GetQuestionById();
