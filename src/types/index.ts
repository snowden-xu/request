import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// 扩展 axios 的 InternalAxiosRequestConfig 接口
declare module "axios" {
  interface InternalAxiosRequestConfig {
    getResponse?: boolean;
  }
}

// request 配置接口
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: InterceptorOptions;
}

// 拦截器配置接口
export interface InterceptorOptions {
  /**
   * 请求拦截器
   */
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  /**
   * 请求错误拦截器
   */
  requestInterceptorCatch?: (error: any) => any;
  /**
   * 响应拦截器
   */
  responseInterceptor?: (response: AxiosResponse) => any;
  /**
   * 响应错误拦截器
   */
  responseInterceptorCatch?: (error: AxiosError) => any;
}

// 定义响应类型条件类型
type RequestConfigWithResponse = RequestConfig & { getResponse: true };

type RequestConfigWithoutResponse = RequestConfig & { getResponse: false };

type RequestMethodOverloads = {
  <T = any>(url: string, config?: RequestConfigWithoutResponse): Promise<T>;
  <T = any, R = AxiosResponse<T>>(url: string, config?: RequestConfigWithResponse): Promise<R>;
  <T = any>(url: string, config?: RequestConfig): Promise<T>;
};

type RequestMethodOverloadsWithData = {
  <T = any, D = any>(url: string, data?: D, config?: RequestConfigWithoutResponse): Promise<RequestConfigWithoutResponse>;
  <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: RequestConfigWithResponse): Promise<R>;
  <T = any, D = any>(url: string, data?: D, config?: RequestConfig): Promise<T>;
};

// 扩展 Axios 实例类型
export interface RequestInstance extends Omit<AxiosInstance, "request"> {
  <T = any>(config: RequestConfigWithoutResponse): Promise<T>;
  <T = any, R = AxiosResponse<T>>(config: RequestConfigWithResponse): Promise<R>;
  <T = any>(config?: RequestConfig): Promise<T>;

  get: RequestMethodOverloads;
  delete: RequestMethodOverloads;
  post: RequestMethodOverloadsWithData;
  put: RequestMethodOverloadsWithData;
  patch: RequestMethodOverloadsWithData;

  create(config?: RequestConfig): RequestInstance;
}
