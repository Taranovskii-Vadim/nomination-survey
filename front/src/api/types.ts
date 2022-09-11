export interface EmptyResponseDTO {}

export type Method = "GET" | "POST" | "PUT";

export type ResultData = object | string | number;

export type Query = string;

export interface Route {
  method: Method;

  getUrl(query?: Query): string;

  getData(dto: any): any;
}
