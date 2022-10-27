import { CommonSurveyFields, SurveyStatus } from 'src/store/types';

import { Route, ResponseDTO, Method } from './types';

interface ResultDTO {
  id: number;
  title: string;
  status: SurveyStatus;
}

class GetSurveys implements Route {
  method: Method = 'GET';

  getUrl = (): string => '/surveys';

  getData = ({ result }: ResponseDTO<ResultDTO[]>): CommonSurveyFields[] => result;
}

export default new GetSurveys();
