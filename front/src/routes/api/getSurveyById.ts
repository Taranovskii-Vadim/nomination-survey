import { Survey } from "../../store/surveyStore/types";
import { mapSurveyStatus } from "../../utils/api";
import { Method, Route, SurveyStatusFromServer } from "./types";

// interface OptionDTO {
//   id: string;
//   title: string;
// }

// interface QuestionDTO {
//   id: string;
//   description: string;
//   options: OptionDTO[] | OptionTypeFromServer;
// }

interface ResponseDTO {
  id: string;
  title: string;
  status: SurveyStatusFromServer;
  description: string;
  questions: string[];
}

export type GetSurveyByIdDTO = Omit<Survey, "questions"> & {
  questions: string[];
};

class GetSurveyById implements Route {
  method: Method = "GET";

  getUrl({ id }: { id: string }): string {
    return `/survey/${id}`;
  }

  getData(data: ResponseDTO): GetSurveyByIdDTO {
    return {
      ...data,
      status: mapSurveyStatus(data.status),
    };
  }
}

export default new GetSurveyById();
