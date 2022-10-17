import { SurveyStatus } from "src/store/types";

import { Route, Method, ResponseDTO } from "./types";

interface ResultDTO {
  isUserVoted: boolean;
  survey: {
    id: number;
    title: string;
    questions: number[];
    description: string;
    status: SurveyStatus;
  };
}

class GetSurveyById implements Route {
  method: Method = "GET";

  getUrl = (id: string): string => `/surveys/${id}`;

  // TODO fix any
  getData = ({ result }: ResponseDTO<ResultDTO>): any => {
    const { isUserVoted, survey: data } = result;

    return { isUserVoted, data };
  };
}

export default new GetSurveyById();
