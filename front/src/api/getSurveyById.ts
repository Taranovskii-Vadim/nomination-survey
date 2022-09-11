import { SurveyStatus } from "src/store/types";

import { Route, Method } from "./types";

interface ResponseDTO {
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

  getUrl(id: string): string {
    return `/surveys/${id}`;
  }
  // TODO fix any
  getData({ isUserVoted, survey }: ResponseDTO): any {
    return {
      isUserVoted,
      data: survey,
    };
  }
}

export default new GetSurveyById();
