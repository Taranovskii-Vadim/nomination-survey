import { SurveyStatus } from "src/store/types";
import { Survey } from "../store/survey/types";
import { Route, Method } from "./types";

interface SurveyResponseDTO {
  id: string;
  title: string;
  status: SurveyStatus;
  description?: string;
  questions: string[];
}

interface ResponseDTO {
  isUserVoted: boolean;
  survey: SurveyResponseDTO;
}

type GetSurveyByIdData = Omit<Survey, "questions"> & {
  questions: string[];
};

export interface GetSurveyByIdDTO {
  isUserVoted: boolean;
  data: GetSurveyByIdData;
}

class GetSurveyById implements Route {
  method: Method = "GET";

  getUrl(id: string): string {
    return `/surveys/${id}`;
  }

  getData({ isUserVoted, survey }: ResponseDTO): GetSurveyByIdDTO {
    return {
      isUserVoted,
      data: survey,
    };
  }
}

export default new GetSurveyById();
