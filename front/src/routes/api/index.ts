import axios, { AxiosRequestConfig } from "axios";

import { API_ENDPOINT } from "./constants";
import { Query, ResultData, Route } from "./types";

export const axiosInstance = axios.create({
  baseURL: `${API_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
  },
});

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

  return route.getData(data);
};
