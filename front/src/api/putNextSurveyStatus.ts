import { EmptyResponseDTO, Method, Route } from "./types";

class PutNextSurveyStatus implements Route {
  method: Method = "PUT";

  getUrl(id: string): string {
    return `/surveys/${id}`;
  }

  getData(result: EmptyResponseDTO): EmptyResponseDTO {
    return result;
  }
}

export default new PutNextSurveyStatus();
