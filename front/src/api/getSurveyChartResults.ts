import { ChartData } from "../store/survey/types";
import { Method, ResponseDTO, Route } from "./types";

interface ResultDTO {
  [key: string]: number;
}

class GetSurveyChartResults implements Route {
  method: Method = "GET";

  getUrl = (query: string): string => `/surveys/results/${query}`;

  getData = ({ result }: ResponseDTO<ResultDTO>): ChartData => result;
}

export default new GetSurveyChartResults();
