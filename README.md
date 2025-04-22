# @snowypeak/request

一个基于 Axios 的轻量级 HTTP 请求库，提供简洁的 API 和强大的拦截器功能。

## 特性

- 基于 Axios 封装，提供更简洁的 API
- 完整的 TypeScript 类型支持
- 灵活的拦截器配置
- 支持创建多个请求实例
- 支持所有 HTTP 方法（GET、POST、PUT、DELETE、PATCH 等）

## 安装

```bash
npm install @snowypeak/request axios
# 或
yarn add @snowypeak/request axios
# 或
pnpm add @snowypeak/request axios
```

## 基本使用

```typescript
import request from "@snowypeak/request";

// 发起 GET 请求
request.get("/api/users").then((response) => {
  console.log(response);
});

// 发起 POST 请求
request
  .post("/api/users", {
    name: "John",
    email: "john@example.com",
  })
  .then((response) => {
    console.log(response);
  });
```

## 创建自定义实例

```typescript
import request from "@snowypeak/request";

const customRequest = request.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-token",
  },
  // 配置拦截器
  interceptors: {
    requestInterceptor: (config) => {
      console.log("请求发送前...");
      return config;
    },
    responseInterceptor: (response) => {
      console.log("响应接收后...");
      return response.data;
    },
    responseInterceptorCatch: (error) => {
      console.error("响应错误:", error);
      return Promise.reject(error);
    },
  },
});

// 使用自定义实例发起请求
customRequest.get("/users");
```

## API 参考

### 请求方法

- `request<T>(config)`: 发起请求，返回 Promise<T>
- `get<T>(url, config?)`: 发起 GET 请求，返回 Promise<T>
- `post<T>(url, data?, config?)`: 发起 POST 请求，返回 Promise<T>
- `put<T>(url, data?, config?)`: 发起 PUT 请求，返回 Promise<T>
- `delete<T>(url, config?)`: 发起 DELETE 请求，返回 Promise<T>
- `patch<T>(url, data?, config?)`: 发起 PATCH 请求，返回 Promise<T>
- `create(config?)`: 创建新的请求实例，返回 RequestInstance

### 配置选项

`RequestConfig` 接口继承自 Axios 的 `AxiosRequestConfig`，并添加了以下属性：

```typescript
interface RequestConfig extends AxiosRequestConfig {
  interceptors?: InterceptorOptions;
}

interface InterceptorOptions {
  // 请求拦截器
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  // 请求错误拦截器
  requestInterceptorCatch?: (error: any) => any;
  // 响应拦截器
  responseInterceptor?: (response: any) => any;
  // 响应错误拦截器
  responseInterceptorCatch?: (error: any) => any;
}
```

## 拦截器使用示例

```typescript
import request from "@snowypeak/request";

const apiRequest = request.create({
  baseURL: "https://api.example.com",
  interceptors: {
    // 请求拦截器
    requestInterceptor: (config) => {
      // 添加认证头
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    },

    // 响应拦截器
    responseInterceptor: (response) => {
      // 只返回响应数据部分
      return response.data;
    },

    // 响应错误处理
    responseInterceptorCatch: (error) => {
      const { response } = error;
      if (response && response.status === 401) {
        // 处理未授权错误
        console.error("认证失败，请重新登录");
        // 重定向到登录页或刷新 token
      }
      return Promise.reject(error);
    },
  },
});
```

## 类型支持

库提供完整的 TypeScript 类型支持，可以指定响应数据的类型：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// 指定响应类型为 User 数组
request.get<User[]>("/api/users").then((users) => {
  // users 被正确推断为 User[] 类型
  users.forEach((user) => console.log(user.name));
});
```

## 许可证

MIT
