import axios, { AxiosRequestConfig } from "axios";

import { getUserFromStorage } from "../utils";
import { Route, ResultData, Query } from "./types";

const API_ENDPOINT = "/api";

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

(function () {
  const userResponse = getUserFromStorage();

  if (userResponse) {
    axiosInstance.defaults.headers["token"] = userResponse.token;
  }
})();

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
