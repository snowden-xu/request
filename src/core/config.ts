import { RequestConfig } from "@/types";

const defaultConfig: RequestConfig = {
  baseURL: "/",
  timeout: 10 * 1000,
  interceptors: {
    // 请求拦截器
    requestInterceptor: (config) => {
      // console.log(config, "config");
      return config;
    },
    // 请求错误拦截器
    requestInterceptorCatch: (error) => {
      // 处理请求错误
      // console.error("Request Error:", error);
      return Promise.reject(error);
    },
    // 响应拦截器
    responseInterceptor: (response) => {
      const {
        config: { getResponse = false },
      } = response;

      if (getResponse) {
        return response;
      }
      // 自定义响应数据处理
      const { success, data, errors } = response.data;
      if (success) {
        return data; // 直接返回数据部分
      }
      // console.log("errors", errors);
      return Promise.reject(errors);
    },
    // 响应错误拦截器
    responseInterceptorCatch: (error) => {
      // 处理响应错误
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            console.error("请求错误");
            break;
          case 401:
            console.error("未授权，跳转登录");
            break;
          case 403:
            console.error("没有权限访问资源");
            break;
          case 500:
            console.error("服务器内部错误");
            break;
          default:
            console.error("请求失败");
        }
      } else if (error.request) {
        console.error("请求无响应：", error.message);
      } else {
        console.error("请求出错：", error.message);
      }
      // console.error("Response Error:", error);
      return Promise.reject(error);
    },
  },
};

export default defaultConfig;
