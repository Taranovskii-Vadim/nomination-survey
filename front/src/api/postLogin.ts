import { Route, Method } from "./types";

// // TODO create common template
// // TODO add unit tests for this project
// interface ResponseDTO {
//   fullname: string;
//   role: User["role"];
// }

class PostLogin implements Route {
  method: Method = "POST";

  getUrl = (login) => `/auth/${login}`;

  // getData = (data: ResponseDTO) => data;
}

export default new PostLogin();
