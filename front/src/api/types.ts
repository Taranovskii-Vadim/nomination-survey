export type Method = 'GET' | 'POST' | 'PUT';

export type ResultData = object | string | number;

export type Query = string | number;

export type ResponseDTO<K extends string, T> = {
  [key in K]: T;
};

export interface Route<D = unknown> {
  method: Method;

  getUrl: (query?: Query) => string;

  getData?: (dto: unknown) => D;
}
