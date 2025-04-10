import type { AxiosRequestConfig } from "axios";

export const defaultConfig: AxiosRequestConfig = {
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};
