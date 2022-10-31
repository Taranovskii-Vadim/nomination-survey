import { Method, Route } from './types';

class PutNextSurveyStatus implements Route {
  method: Method = 'PUT';

  getUrl = (id: string): string => `/surveys/${id}`;
}

export default new PutNextSurveyStatus();
