# @snowypeak/request

一个基于 axios 的现代 HTTP 请求库，为浏览器和 Node.js 环境提供统一的请求接口。

## 特性

- 🚀 简洁易用的 API 设计
- 🛠️ 完整的 TypeScript 类型支持
- 🔄 灵活的请求/响应拦截器
- 🔍 统一的错误处理机制
- 📦 支持 ESM 和 UMD 格式
- 🧩 与 axios 完全兼容

## 安装

```bash
# 使用 npm
npm install @snowypeak/request axios

# 使用 yarn
yarn add @snowypeak/request axios

# 使用 pnpm
pnpm add @snowypeak/request axios
```

## 快速开始

### 基本使用

```typescript
import { request } from "@snowypeak/request";

// 发起 GET 请求
request("/api/users").then((data) => {
  console.log(data);
});

// 发起 POST 请求
request("/api/users", {
  method: "POST",
  data: {
    name: "John Doe",
    email: "john@example.com",
  },
}).then((data) => {
  console.log(data);
});

// 获取完整响应对象
request("/api/users", {
  getResponse: true,
}).then((response) => {
  console.log(response.status);
  console.log(response.data);
});
```

### 使用拦截器

```typescript
import { request } from "@snowypeak/request";

// 请求拦截器
const requestInterceptor = (config) => {
  // 在发送请求之前做些什么
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

// 响应拦截器
const responseInterceptor = (response) => {
  // 对响应数据做点什么
  return response;
};

// 错误拦截器
const errorInterceptor = (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
};

// 发起请求时附加拦截器
request("/api/users", {
  requestInterceptors: [[requestInterceptor, errorInterceptor]],
  responseInterceptors: [[responseInterceptor, errorInterceptor]],
});
```

## API 文档

### `request(url, options?)`

发起 HTTP 请求的核心函数。

**参数：**

- `url: string` - 请求地址
- `options?: RequestOptions` - 请求配置选项，继承自 `AxiosRequestConfig`

**返回值：**

- 默认返回响应数据 `Promise<T>`
- 当 `getResponse: true` 时返回完整响应对象 `Promise<AxiosResponse<T>>`

**配置选项：**

```typescript
interface RequestOptions extends AxiosRequestConfig {
  // 是否返回完整响应对象
  getResponse?: boolean;
  // 是否跳过错误处理
  skipErrorHandler?: boolean;
  // 请求拦截器
  requestInterceptors?: RequestInterceptorTuple[];
  // 响应拦截器
  responseInterceptors?: ResponseInterceptorTuple[];
  // 其他自定义选项
  [key: string]: any;
}
```

### `getRequestInstance()`

获取底层 axios 实例。

**返回值：**

- `AxiosInstance` - 已配置的 axios 实例

## 贡献

欢迎提交问题和拉取请求。请确保遵循项目的代码风格和提交消息规范。

## 许可证

MIT
