import {
  EmptyResponseDTO,
  Method,
  Route,
  SurveyIdQuery,
} from "../routes/types";

class PutNextSurveyStatus implements Route {
  method: Method = "PUT";

  getUrl({ surveyId }: SurveyIdQuery): string {
    return `/survey/${surveyId}`;
  }

  getData(result: EmptyResponseDTO): EmptyResponseDTO {
    return result;
  }
}

export default new PutNextSurveyStatus();
