import { Survey } from "../../store/surveyStore/types";
import { SurveyStatusDTO } from "../../types";
import { mapSurveyStatus } from "../../utils/api";
import { Route, Method, SurveyIdQuery } from "../types";

interface SurveyResponseDTO {
  id: string;
  title: string;
  status: SurveyStatusDTO;
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

  getUrl({ surveyId }: SurveyIdQuery): string {
    return `/survey/${surveyId}`;
  }

  getData({ isUserVoted, survey }: ResponseDTO): GetSurveyByIdDTO {
    return {
      isUserVoted,
      data: {
        ...survey,
        status: mapSurveyStatus(survey.status),
      },
    };
  }
}

export default new GetSurveyById();
