import { SurveyRenderItem } from "../../store/surveysStore/types";
import { mapSurveyStatus } from "../../utils/api";
import { Method, Route, SurveyStatusFromServer } from "./types";

interface ResponseDTO {
  id: string;
  title: string;
  status: SurveyStatusFromServer;
}

class GetSurveys implements Route {
  method: Method = "GET";

  getUrl(): string {
    return "/survey";
  }

  getData(data: Array<ResponseDTO>): SurveyRenderItem[] {
    return data.map((item) => ({
      ...item,
      status: mapSurveyStatus(item.status),
    }));
  }
}

export default new GetSurveys();
