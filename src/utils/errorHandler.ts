import { AxiosError } from "axios";

export function handleError(error: AxiosError) {
  if (error.response) {
    const { status, data } = error.response;
    switch (status) {
      case 401:
        console.warn("未授权");
        break;
      case 500:
        console.error("服务器错误:", data);
        break;
      default:
      // console.warn(data?.message || "未知错误");
    }
  } else if (error.request) {
    console.warn("网络异常或超时");
  } else {
    console.error("请求配置异常", error.message);
  }
}
