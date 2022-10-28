import { SurveyStatus } from 'src/store/types';
import { SurveyResponse } from 'src/store/survey/types';

import { Route, Method, ResponseDTO } from './types';

interface ResultDTO {
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

  getUrl = (id: string): string => `/surveys/${id}`;

  getData = ({ result }: ResponseDTO<ResultDTO>): SurveyResponse => {
    const { isUserVoted, survey: data } = result;

    return { isUserVoted, data };
  };
}

export default new GetSurveyById();
