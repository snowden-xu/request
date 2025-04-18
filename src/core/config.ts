import { RequestConfig } from "@/types";

const defaultConfig: RequestConfig = {
  baseURL: "/",
  interceptors: {
    // 请求拦截器
    requestInterceptor: (config) => {
      console.log(config, "config");
      return config;
    },
    // 请求错误拦截器
    requestInterceptorCatch: (error) => {
      // 处理请求错误
      console.error("Request Error:", error);
      return Promise.reject(error);
    },
    // 响应拦截器
    responseInterceptor: (response) => {
      // 自定义响应数据处理
      const { success, data, errors } = response.data;
      if (success) {
        return data; // 直接返回数据部分
      }
      return Promise.reject(errors);
    },
    // 响应错误拦截器
    responseInterceptorCatch: (error) => {
      // 处理响应错误
      console.error("Response Error:", error);
      return Promise.reject(error);
    },
  },
};

export default defaultConfig;
