import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { handleError } from "@/utils/errorHandler";
import type { InterceptorOptions } from "@/types";

export function setInterceptors(instance: AxiosInstance, interceptors?: InterceptorOptions) {
  // 请求拦截器
  instance.interceptors.request.use(interceptors?.requestInterceptor || ((config: InternalAxiosRequestConfig) => config), interceptors?.requestInterceptorCatch);

  // 响应拦截器
  instance.interceptors.response.use(
    async <T>(res: AxiosResponse<T>) => {
      if (interceptors?.responseInterceptor) {
        return interceptors.responseInterceptor(res);
      }
      return res;
    },
    (err) => {
      if (interceptors?.responseInterceptorCatch) {
        return interceptors.responseInterceptorCatch(err);
      }
      return handleError(err);
    }
  );
}
