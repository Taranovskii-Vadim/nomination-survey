import { ChartData } from '../store/survey/types';

import { GET_SURVEY_CHART_RESULTS } from './constants';
import { Method, ResponseDTO, Route } from './types';

export interface ResultDTO {
  [key: string]: number;
}

class GetSurveyChartResults implements Route {
  method: Method = 'GET';

  getUrl = (query: string): string => `${GET_SURVEY_CHART_RESULTS}/${query}`;

  getData = ({ result }: ResponseDTO<ResultDTO>): ChartData => result;
}

export default new GetSurveyChartResults();
