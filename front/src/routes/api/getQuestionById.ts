import { Option, OptionType, Question } from "../../store/surveyStore/types";
import { mapSurveyOptionType } from "../../utils/api";
import { Method, OptionTypeFromServer, Route } from "./types";

interface OptionDTO {
  id: string;
  title: string;
}

interface ResponseDTO {
  id: string;
  description: string;
  options: OptionDTO[] | OptionTypeFromServer;
}

class GetQuestionById implements Route {
  method: Method = "GET";

  getUrl({ id }: { id: string }): string {
    return `/question/${id}`;
  }

  getData(data: ResponseDTO): Question {
    const options: Option[] | OptionType = Array.isArray(data.options)
      ? data.options
      : mapSurveyOptionType(data.options);
    return { ...data, options };
  }
}

export default new GetQuestionById();
