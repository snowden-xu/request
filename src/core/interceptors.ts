import type { AxiosInstance, AxiosResponse } from "axios";
import type { InterceptorOptions } from "@/types";

export function setInterceptors(instance: AxiosInstance, interceptors: InterceptorOptions) {
  // 请求拦截器
  instance.interceptors.request.use(interceptors.requestInterceptor, interceptors.requestInterceptorCatch);

  // 响应拦截器
  instance.interceptors.response.use(
    async <T>(res: AxiosResponse<T>) => {
      return interceptors.responseInterceptor(res);
    },
    (err) => {
      return interceptors.responseInterceptorCatch(err);
    }
  );
}
