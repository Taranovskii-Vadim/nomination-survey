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

  getData = ({ result }: ResponseDTO<ResultDTO>) => {
    const { isUserVoted, survey: data } = result;

    return { isUserVoted, data };
  };
}

export default new GetSurveyById();
