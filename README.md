# @snowypeak/request

一个基于 Axios 的轻量级 HTTP 请求库，提供简洁的 API 和强大的拦截器功能。

## 特性

- 基于 Axios 封装，提供更简洁的 API
- 完整的 TypeScript 类型支持
- 灵活的拦截器配置
- 支持创建多个请求实例
- 支持所有 HTTP 方法（GET、POST、PUT、DELETE、PATCH 等）
- 支持自定义响应格式，可选是否获取完整响应对象

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

// 使用配置对象方式发起请求
request({
  url: "/api/users",
  method: "GET",
  params: {
    page: 1,
    limit: 10,
  },
}).then((response) => {
  console.log(response);
});

// 带完整配置的 POST 请求
request({
  url: "/api/users",
  method: "POST",
  data: {
    name: "John",
    email: "john@example.com",
  },
  headers: {
    "X-Custom-Header": "value",
  },
  timeout: 5000,
  getResponse: true,
}).then((response) => {
  console.log(response);
});

// 发起 GET 请求
request.get("/api/users").then((response) => {
  console.log(response); // 默认只返回 response.data
});

// 获取完整响应对象
request.get("/api/users", { getResponse: true }).then((response) => {
  console.log(response.status); // 获取状态码
  console.log(response.headers); // 获取响应头
  console.log(response.data); // 获取响应数据
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

## 默认配置

该库提供了一些默认配置，包括：

```typescript
const defaultConfig = {
  baseURL: "/",
  timeout: 10000, // 10秒超时
  interceptors: {
    responseInterceptor: (response) => {
      const { success, data, errors } = response.data;
      if (success) {
        return data; // 直接返回数据部分
      }
      return Promise.reject(errors);
    },
    responseInterceptorCatch: (error) => {
      // 统一错误处理
      if (error.response) {
        switch (error.response.status) {
          case 401:
            console.error("未授权，请重新登录");
            break;
          case 403:
            console.error("没有权限访问资源");
            break;
          // ...其他错误处理
        }
      }
      return Promise.reject(error);
    },
  },
};
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
  interceptors: {
    requestInterceptor: (config) => {
      // 添加自定义请求头
      config.headers["X-Custom-Header"] = "value";
      return config;
    },
    responseInterceptor: (response) => {
      // 自定义响应处理
      return response.data.result;
    },
  },
});
```

## 类型支持

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: string[];
}

interface User {
  id: number;
  name: string;
  email: string;
}

// 基础请求
request.get<User[]>("/users").then((users) => {
  users.forEach((user) => console.log(user.name));
});

// 获取完整响应
request
  .get<ApiResponse<User[]>>("/users", {
    getResponse: true,
  })
  .then((response) => {
    console.log(response.data.success);
    console.log(response.data.data);
  });

// POST 请求带请求体类型
interface CreateUserDto {
  name: string;
  email: string;
}

request.post<User, CreateUserDto>("/users", {
  name: "John",
  email: "john@example.com",
});
```

## 许可证

MIT
