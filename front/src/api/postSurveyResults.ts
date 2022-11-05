import { POST_SURVEY_RESULTS } from './constants';
import { Method, Route } from './types';

class PostSurveyResults implements Route {
  method: Method = 'POST';

  getUrl = (id: number): string => `${POST_SURVEY_RESULTS}/${id}`;
}

export default new PostSurveyResults();
