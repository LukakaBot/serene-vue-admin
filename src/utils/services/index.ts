import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ResponseContent } from './types';

const env = import.meta.env;

const request: AxiosInstance = axios.create({
  baseURL: env.VITE_PROXY_URL + env.VITE_BASE_API,
  timeout: 5 * 1000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ResponseContent>) => {
    const res = response.data;
    // 下面是针对不同响应状态码的处理逻辑
    if (res.code === 0) {
      return res.value;
    } else {
      window.$message?.error(res.msg);
    }
    return Promise.reject(res.msg);
  },
  (error) => {
    window.$message?.error(error);
    return Promise.reject(error);
  }
)


export default request;