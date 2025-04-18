import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// 定义通用响应结构
// export interface ResponseData<T = any> {
//   errors: number;
//   data: T;
//   success: boolean;
// }

// request 配置接口
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: InterceptorOptions;
}

// 错误响应结构
export interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

// 拦截器配置接口
export interface InterceptorOptions {
  /**
   * 请求拦截器
   */
  requestInterceptor?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  /**
   * 请求错误拦截器
   */
  requestInterceptorCatch?: (error: any) => any;
  /**
   * 响应拦截器
   */
  responseInterceptor?: (response: any) => any;
  /**
   * 响应错误拦截器
   */
  responseInterceptorCatch?: (error: any) => any;
}

// 扩展 Axios 实例类型
export interface RequestInstance extends Omit<AxiosInstance, "request"> {
  <T = any>(config: AxiosRequestConfig): Promise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  create(config?: RequestConfig): RequestInstance;
}
