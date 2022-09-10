import { SurveyRenderItem } from "../store/surveysStore/types";
import { SurveyStatusDTO } from "../types";
import { mapSurveyStatus } from "../utils/api";
import { Route, Method } from "../routes/types";

interface ResponseDTO {
  id: string;
  title: string;
  status: SurveyStatusDTO;
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
