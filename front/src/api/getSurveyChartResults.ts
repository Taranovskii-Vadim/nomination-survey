import { ChartData } from '../store/survey/types';

import { GET_SURVEY_CHART_RESULTS } from './constants';
import { Method, ResponseDTO, Route } from './types';

interface ResultDTO {
  [key: string]: number;
}

class GetSurveyChartResults implements Route {
  method: Method = 'GET';

  getUrl = (query: string): string => `${GET_SURVEY_CHART_RESULTS}/${query}`;

  getData = ({ chart }: ResponseDTO<'chart', ResultDTO>): ChartData => chart;
}

export default new GetSurveyChartResults();
