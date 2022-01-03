import { ChartData } from "../../store/surveyStore/types";
import { Method, Route, SurveyIdQuery } from "../types";

interface ResponseDTO {
  [key: string]: number;
}

class GetSurveyChartResults implements Route {
  method: Method = "GET";

  getUrl({ surveyId }: SurveyIdQuery): string {
    return `/survey/results/${surveyId}`;
  }

  getData(data: ResponseDTO): ChartData {
    return data;
  }
}

export default new GetSurveyChartResults();
