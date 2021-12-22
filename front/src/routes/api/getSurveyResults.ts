import { EmptyResponseDTO, Method, Route, SurveyIdQuery } from "../types";

class GetSurveyResults implements Route {
  method: Method = "GET";

  getUrl({ surveyId }: SurveyIdQuery): string {
    return `/survey/download/${surveyId}`;
  }

  getData(result: EmptyResponseDTO): EmptyResponseDTO {
    return result;
  }
}

export default new GetSurveyResults();
