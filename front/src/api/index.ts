import axios, { AxiosRequestConfig } from "axios";

import store from "src/store/user";

import { Route, ResultData, Query } from "./types";

const API_ENDPOINT = "/api";

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (r) => r,
  (error) => {
    const { status, data } = error.response;

    if (status === 401) {
      // TODO show modal window
      store.resetLoginForm();
    }

    return error;
  }
);

export const api = async <R extends Route>(
  route: R,
  payload?: ResultData,
  query?: Query
): Promise<any> => {
  let config: AxiosRequestConfig = {
    method: route.method,
    url: route.getUrl(query),
  };

  if (payload) {
    config = { ...config, data: payload };
  }

  const { data } = await axiosInstance.request(config);

  return route.getData ? route.getData(data) : null;
};
