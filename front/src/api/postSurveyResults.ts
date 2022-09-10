import {
  EmptyResponseDTO,
  Method,
  Route,
  SurveyIdQuery,
} from "../routes/types";

class PostSurveyResults implements Route {
  method: Method = "POST";

  getUrl({ surveyId }: SurveyIdQuery): string {
    return `/survey/${surveyId}`;
  }

  getData(data: EmptyResponseDTO): null {
    return null;
  }
}

export default new PostSurveyResults();
