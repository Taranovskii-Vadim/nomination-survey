export type Method = "GET" | "POST";

export type ResultData = object | string | number;

export type RoleFromServer = "admin" | "ordinaryUser" | "generalUser";

export type SurveyStatusFromServer =
  | "notReady"
  | "userVote"
  | "chiefVote"
  | "closed";

export interface Query {
  [key: string]: string | number;
}

export interface Route {
  method: Method;

  getUrl(query?: any): string;

  getData(dto: any): any;
}
