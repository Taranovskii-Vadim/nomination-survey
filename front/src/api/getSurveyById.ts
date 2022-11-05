import { SurveyStatus } from 'src/store/types';
import { SurveyResponse } from 'src/store/survey/types';

import { Route, Method, ResponseDTO } from './types';
import { GET_SURVEY_BY_ID } from './constants';

export interface ResultDTO {
  isUserVoted: boolean;
  survey: {
    id: number;
    title: string;
    questions: { id: number; text: string }[];
    description: string;
    status: SurveyStatus;
  };
}

class GetSurveyById implements Route {
  method: Method = 'GET';

  getUrl = (id: number): string => `${GET_SURVEY_BY_ID}/${id}`;

  getData = ({ result }: ResponseDTO<ResultDTO>): SurveyResponse => {
    const { isUserVoted, survey: data } = result;

    return { isUserVoted, data };
  };
}

export default new GetSurveyById();
