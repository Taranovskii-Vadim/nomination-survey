import { SurveyStatus } from "src/store/types";
import { SurveyRenderItem } from "../store/surveys/types";
import { Route, Method } from "./types";

interface ResponseDTO {
  id: string;
  title: string;
  status: SurveyStatus;
}

class GetSurveys implements Route {
  method: Method = "GET";

  getUrl(): string {
    return "/survey";
  }

  getData(data: Array<ResponseDTO>): SurveyRenderItem[] {
    return data;
  }
}

export default new GetSurveys();
