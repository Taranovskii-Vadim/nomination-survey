import { ChartData } from "../store/survey/types";
import { Method, Route } from "./types";

interface ResponseDTO {
  [key: string]: number;
}

class GetSurveyChartResults implements Route {
  method: Method = "GET";

  getUrl(query: string): string {
    return `/survey/results/${query}`;
  }

  getData(data: ResponseDTO): ChartData {
    return data;
  }
}

export default new GetSurveyChartResults();
