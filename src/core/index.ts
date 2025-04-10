import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { defaultConfig } from "./config";
import { setInterceptors } from "./interceptors";

export class Request {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({ ...defaultConfig, ...config });
    setInterceptors(this.instance);
  }

  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ method: "get", url, ...config });
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ method: "post", url, data, ...config });
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ method: "put", url, data, ...config });
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ method: "delete", url, ...config });
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>({ method: "patch", url, data, ...config });
  }
}

export function createRequest(config: AxiosRequestConfig = {}) {
  return new Request(config);
}
