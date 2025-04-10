# @snowypeak/request

一个基于 axios 的 HTTP 请求封装库，提供简洁易用的 API 接口，支持请求拦截、响应拦截、错误处理等功能。

## 安装

```bash
npm install @snowypeak/request
# 或
yarn add @snowypeak/request
```

由于本库依赖于 axios，请确保已安装 axios：

```bash
npm install axios
# 或
yarn add axios
```

## 基本使用

### 导入和初始化

```typescript
// 使用默认实例
import request from "@snowypeak/request";

// 或者创建自定义实例
import { createRequest } from "@snowypeak/request";

const customRequest = createRequest({
  baseURL: "https://api.example.com",
  timeout: 5000,
});
```

### 基本请求方法

```typescript
// GET 请求
request.get<ResponseType>("/users");

// POST 请求
request.post<ResponseType>("/users", { name: "John", age: 30 });

// PUT 请求
request.put<ResponseType>("/users/1", { name: "John", age: 31 });

// DELETE 请求
request.delete<ResponseType>("/users/1");

// PATCH 请求
request.patch<ResponseType>("/users/1", { age: 32 });

// 自定义请求
request.request<ResponseType>({
  method: "get",
  url: "/users",
  params: { page: 1 },
});
```

### 使用泛型指定响应类型

```typescript
import { BaseResponse } from "@snowypeak/request";

interface User {
  id: number;
  name: string;
  age: number;
}

// 指定响应数据类型
request.get<BaseResponse<User>>("/users/1").then((response) => {
  // response.data 类型为 User
  console.log(response.data);
});
```

## 高级配置

### 创建自定义实例

```typescript
import { createRequest } from "@snowypeak/request";
import type { AxiosRequestConfig } from "axios";

const customConfig: AxiosRequestConfig = {
  baseURL: "https://api.example.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Custom-Header": "custom-value",
  },
};

const customRequest = createRequest(customConfig);
```

### 默认配置

默认配置如下：

```typescript
const defaultConfig: AxiosRequestConfig = {
  baseURL: "/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};
```

## 拦截器

该库默认配置了请求和响应拦截器：

### 请求拦截器

默认的请求拦截器会自动从 localStorage 中获取 token 并添加到请求头中：

```typescript
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 响应拦截器

默认的响应拦截器会自动解析响应数据，并处理错误：

```typescript
instance.interceptors.response.use(
  (res) => res.data, // 自动返回 response.data
  (err) => {
    handleError(err); // 自动处理错误
    return Promise.reject(err);
  }
);
```

## 错误处理

库内置了错误处理函数，会根据不同的错误类型进行相应处理：

```typescript
export function handleError(error: AxiosError) {
  if (error.response) {
    // 服务器返回了错误状态码
    const { status, data } = error.response;
    switch (status) {
      case 401:
        console.warn("未授权");
        break;
      case 500:
        console.error("服务器错误:", data);
        break;
      default:
      // 其他错误
    }
  } else if (error.request) {
    // 请求已发送但没有收到响应
    console.warn("网络异常或超时");
  } else {
    // 请求配置出错
    console.error("请求配置异常", error.message);
  }
}
```

## 工具函数

### 转换为 FormData

```typescript
import { toFormData } from "@snowypeak/request/utils/requestHelper";

const data = {
  name: "John",
  avatar: fileObject,
  age: 30,
};

const formData = toFormData(data);
request.post("/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
```

## 类型定义

### BaseResponse

```typescript
export interface BaseResponse<T = any> {
  code: number;
  message: string;
  data: T;
}
```

## 完整示例

```typescript
import request, { createRequest, BaseResponse } from "@snowypeak/request";
import { toFormData } from "@snowypeak/request/utils/requestHelper";

// 定义接口返回类型
interface User {
  id: number;
  name: string;
  age: number;
}

// 创建自定义请求实例
const apiRequest = createRequest({
  baseURL: "https://api.example.com/v1",
  timeout: 8000,
});

// GET 请求示例
async function getUser(id: number) {
  try {
    const response = await apiRequest.get<BaseResponse<User>>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("获取用户信息失败", error);
    return null;
  }
}

// POST 请求示例
async function createUser(userData: Omit<User, "id">) {
  try {
    const response = await apiRequest.post<BaseResponse<User>>(
      "/users",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("创建用户失败", error);
    return null;
  }
}

// 上传文件示例
async function uploadAvatar(userId: number, file: File) {
  try {
    const formData = toFormData({
      userId,
      avatar: file,
    });

    const response = await apiRequest.post<BaseResponse<{ avatarUrl: string }>>(
      "/users/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.avatarUrl;
  } catch (error) {
    console.error("上传头像失败", error);
    return null;
  }
}
```

## 许可证

MIT
