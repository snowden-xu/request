import type { AxiosInstance } from "axios";
import { handleError } from "@/utils/errorHandler";

export function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => res.data,
    (err) => {
      handleError(err);
      return Promise.reject(err);
    }
  );
}
