/**
 * 必须对 http 请求封装一层，
 * 防止 axios 被换成别的库
 */

import axios from 'axios'
import { Notification } from 'element-ui'

const http = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {'X-Custom-Header': 'foo'}
})

// http response 拦截器
http.interceptors.response.use(
  response => {
    const { msg, data, error } = response.data;

    if (error) {
      Notification.error(error.msg || `${response.data}`);
      return false;
    }

    if (msg || data === undefined) {
      message.error(msg || `${response.data}`);
      return false;
    }

    return data;
  },
  error => {
    if ((error.code === 'ECONNABORTED')) {
      message.error('服务器繁忙，请稍后重试');
    }
    
    return Promise.reject(false);
  }
);

export default function request(url, options = {}) {
  return http({ url, ...options })
}
