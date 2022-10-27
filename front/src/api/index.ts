import axios, { AxiosRequestConfig } from 'axios';

import store from 'src/store/user';

import { Route, ResultData, Query } from './types';

const API_ENDPOINT = '/api';

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (r) => r,
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      store.resetLoginForm();
    }

    // TODO handle all errors from api here

    return error;
  },
);

// TODO add prettier config
export const api = async <D>(route: Route<D>, payload?: ResultData, query?: Query): Promise<D | null> => {
  let config: AxiosRequestConfig = { method: route.method, url: route.getUrl(query) };

  if (payload) {
    config = { ...config, data: payload };
  }

  const { data } = await axiosInstance.request<unknown>(config);

  return route.getData ? route.getData(data) : null;
};
