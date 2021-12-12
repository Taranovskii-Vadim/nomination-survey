import { Method, Route } from "../types";

class PostSurveyResults implements Route {
  method: Method = "POST";

  getUrl({ id }: { id: string }): string {
    return `/survey/${id}`;
  }

  getData(): null {
    return null;
  }
}

export default new PostSurveyResults();
