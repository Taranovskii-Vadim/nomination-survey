import { CommonSurveyFields, SurveyStatus } from "src/store/types";

import { Route, Method } from "./types";

interface ResponseDTO {
  id: number;
  title: string;
  status: SurveyStatus;
}

class GetSurveys implements Route {
  method: Method = "GET";

  getUrl(): string {
    return "/surveys";
  }

  getData(data: ResponseDTO[]): CommonSurveyFields[] {
    return data;
  }
}

export default new GetSurveys();
