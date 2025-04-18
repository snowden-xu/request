import axios, {
  mergeConfig,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

import extend from "../utils/extend";
import defaultConfig from "./config";
import { RequestConfig, RequestInstance } from "@/types";
import { setInterceptors } from "@/core/interceptors";

class Request {
  private readonly instance: AxiosInstance;

  constructor(config: RequestConfig = {}) {
    const { interceptors, ...axiosConfig } = config;
    this.instance = axios.create(axiosConfig);
    setInterceptors(this.instance, interceptors);
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

function createInstance(defaultConfig: RequestConfig): RequestInstance {
  const context = new Request(defaultConfig);
  const instance = Request.prototype.request.bind(context) as RequestInstance;

  extend(instance, Request.prototype, context, { allOwnKeys: true });

  extend(instance, context, null, { allOwnKeys: true });

  instance.create = function create(
    instanceConfig?: RequestConfig,
  ): RequestInstance {
    return createInstance(mergeConfig(defaultConfig, instanceConfig || {}));
  };

  return instance;
}

const request = createInstance(defaultConfig);

export default request;
