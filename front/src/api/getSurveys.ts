import { CommonSurveyFields, SurveyStatus } from 'src/store/types';

import { Route, ResponseDTO, Method } from './types';
import { GET_SURVEYS } from './constants';

export interface ResultDTO {
  id: number;
  title: string;
  status: SurveyStatus;
}

class GetSurveys implements Route {
  method: Method = 'GET';

  getUrl = (): string => GET_SURVEYS;

  getData = ({ surveys }: ResponseDTO<'surveys', ResultDTO[]>): CommonSurveyFields[] => surveys;
}

export default new GetSurveys();
