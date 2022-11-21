import { SurveyStatus } from 'src/store/types';

import { PUT_SURVEY_STATUS } from './constants';
import { Method, ResponseDTO, Route } from './types';

class PutNextSurveyStatus implements Route {
  method: Method = 'PUT';

  getUrl = (id: number): string => `${PUT_SURVEY_STATUS}/${id}`;

  getData = ({ newStatus }: ResponseDTO<'newStatus', SurveyStatus>): SurveyStatus => newStatus;
}

export default new PutNextSurveyStatus();
