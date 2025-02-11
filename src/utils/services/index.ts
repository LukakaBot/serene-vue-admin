import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ResponseContent } from './types';

const isDev = import.meta.env.DEV;
const { VITE_SERVICE_URL, VITE_SERVICE_PORT, VITE_SERVICE_PREFIX } = import.meta.env;

const request: AxiosInstance = axios.create({
  baseURL: isDev ? VITE_SERVICE_PREFIX : `${VITE_SERVICE_URL}:${VITE_SERVICE_PORT}${VITE_SERVICE_PREFIX}`,
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
    if (res.code === 200) {
      return res.result;
    } else {
      window.$message?.error(res.message);
    }
    return Promise.reject(res.message);
  },
  (error) => {
    window.$message?.error(error);
    return Promise.reject(error);
  }
)


export default request;