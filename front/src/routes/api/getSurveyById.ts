import { Survey } from "../../store/surveyStore/types";
import { SurveyStatusDTO } from "../../types";
import { mapSurveyStatus } from "../../utils/api";
import { Route, Method } from "../types";

interface ResponseDTO {
  id: string;
  title: string;
  status: SurveyStatusDTO;
  description?: string;
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
