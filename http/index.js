/**
 * 必须对 http 请求封装一层，
 * 防止 axios 被换成别的库 
 */

import axios from 'axios'
import { Notification } from 'element-ui'

const $ = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foo'}
})

// http request 拦截器
$.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
$.interceptors.response.use(
  response => {
    // 假设 code: 0 是获取数据失败，但 http 是成功的
    if (response.data.code === 0) {
      Notification.error({
        title: '错误',
        message: response.data.error ? response.data.error.msg : String(response.data)
      })
    }

    return response
  },
  error => {
    Notification.error({
      title: '异常',
      message: '服务器异常,请稍后重试'
    })

    return Promise.reject(error)
  }
)

export default {
  get (url, params, success) {
    $.get(url, {
      params
    }).then(res => {
      if (typeof success === 'function') {
        success(res.data)
      }
    })
  },
  post (url, params, success) {
    $.post(url, params)
      .then(res => {
        if (typeof success === 'function') {
          success(res.data)
        }
      })
  }
}
