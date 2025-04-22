import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  Axios,
  AxiosResponse,
} from "axios";

// 错误响应结构
export interface ErrorResponse {
  message?: string;
  [key: string]: any;
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
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
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
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<T>;
  create(config?: RequestConfig): RequestInstance;
}
