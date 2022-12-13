// TODO:对axios进行二次封装
import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { ElMessage } from "element-plus";

// 服务器返回的数据类型
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建实例
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 3000
});

// 创建请求拦截器
/* TODO:添加token,开启loading,设置取消请求*/
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

/* 创建相应拦截器*/
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, message } = response.data;
    if (code >= 200 && code < 300) {
      return data;
    } else {
      ElMessage.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    let message = "";
    switch (status) {
      case 401:
        message = "token设置失败，请重新登录";
        // TODO:触发退出系统
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

/**封装公共请求方法
 * 封装的get等方法中之所以使用T泛型，是因为返回的数据不再是AxiosResponse类型了，ts系统检测认为仍然还是此类型，
 * 所以手动改为T泛型
 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },
  put<T = any>(
    url: string,
    config?: AxiosRequestConfig,
    data?: object
  ): Promise<T> {
    return service.put(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  }
};
