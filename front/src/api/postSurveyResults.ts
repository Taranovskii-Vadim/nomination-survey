import { EmptyResponseDTO, Method, Route } from "./types";

class PostSurveyResults implements Route {
  method: Method = "POST";

  getUrl(id: number): string {
    return `/surveys/${id}`;
  }

  getData(data: EmptyResponseDTO): null {
    return null;
  }
}

export default new PostSurveyResults();
