import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/types";

export class RequestError extends Error {
  constructor(
    public message: string,
    public code: string | number,
    public error?: AxiosError
  ) {
    super(message);
    this.name = "RequestError";
  }
}

export function isNetworkError(error: AxiosError): boolean {
  return (
    !error.response && Boolean(error.code) && error.code !== "ECONNABORTED"
  );
}

export async function handleError(
  error: AxiosError<ErrorResponse>
): Promise<never> {
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    throw new RequestError(
      error.response.data?.message || "请求失败",
      error.response.status,
      error
    );
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    throw new RequestError("网络错误，请检查网络连接", "NETWORK_ERROR", error);
  } else {
    // 请求配置发生错误
    throw new RequestError("请求配置错误", "REQUEST_ERROR", error);
  }
}
