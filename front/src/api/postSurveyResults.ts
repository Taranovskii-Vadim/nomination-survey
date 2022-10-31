import { Method, Route } from './types';

class PostSurveyResults implements Route {
  method: Method = 'POST';

  getUrl = (id: number): string => `/surveys/${id}`;
}

export default new PostSurveyResults();
