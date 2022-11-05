import { PUT_SURVEY_STATUS } from './constants';
import { Method, Route } from './types';

class PutNextSurveyStatus implements Route {
  method: Method = 'PUT';

  getUrl = (id: number): string => `${PUT_SURVEY_STATUS}/${id}`;
}

export default new PutNextSurveyStatus();
