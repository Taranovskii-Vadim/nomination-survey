import { ChartData } from "../../store/surveyStore/types";
import { Method, Route, SurveyIdQuery } from "../types";
import { UserRole } from "../../types";

interface ResponseDTO {
  [key: string]: number;
}

interface Query extends SurveyIdQuery {
  role: UserRole;
}

class GetSurveyChartResults implements Route {
  method: Method = "GET";

  getUrl({ surveyId, role }: Query): string {
    return `/survey/results/${role}/${surveyId}`;
  }

  getData(data: ResponseDTO): ChartData {
    return data;
  }
}

export default new GetSurveyChartResults();
