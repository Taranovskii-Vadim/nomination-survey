export type Method = 'GET' | 'POST' | 'PUT';

export type ResultData = object | string | number;

export type Query = string | number;

export interface ResponseDTO<T> {
  result: T;
}

export interface Route<D = unknown> {
  method: Method;

  getUrl: (query?: Query) => string;

  getData?: (dto: unknown) => D;
}
