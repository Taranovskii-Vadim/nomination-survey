import { SurveyStatus } from 'src/store/types';
import { SurveyResponse } from 'src/store/survey/types';

import { Route, Method } from './types';
import { GET_SURVEY_BY_ID } from './constants';

export interface ResultDTO {
  survey: {
    id: number;
    title: string;
    description: string;
    status: SurveyStatus;
    questions: { id: number; text: string }[];
  };
  isUserVoted: boolean;
}

class GetSurveyById implements Route {
  method: Method = 'GET';

  getUrl = (id: number): string => `${GET_SURVEY_BY_ID}/${id}`;

  getData = (data: ResultDTO): SurveyResponse => data;
}

export default new GetSurveyById();
