import { NAVIGATION_ITEMS } from "./constants";

export type TargetPage = keyof typeof NAVIGATION_ITEMS;

export type Method = "GET" | "POST";

export type ResultData = object | string | number;

export interface Query {
  [key: string]: string | number;
}

export interface Route {
  method: Method;

  getUrl(query?: any): string;

  getData(dto: any): any;
}
