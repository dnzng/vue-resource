import axios from 'axios'
import { Loading, Toast } from 'sk-ui'

function createHttp (options) {
  if (typeof options === 'string') {
    options = {
      test: '/',
      prod: options
    }
  }
  
  const baseURL = process.env.NODE_ENV === 'development'
    ? options.test 
    : options.prod
  
  const http = axios.create({
    baseURL,
    timeout: 20000
  })

  // http request 拦截器
  http.interceptors.request.use(
    config => {
      // 是否需要全局 loading
      if (config.__loading__ !== false) {
        Loading.show()
      }
      return config
    },
    error => {
      Loading.hide()
      return Promise.reject(error)
    }
  )
  // http response 拦截器
  http.interceptors.response.use(
    config => {
      Loading.hide()
      return config.data
    },
    error => {
      Loading.hide()
      if (error.code === 'ECONNABORTED') {
        Toast('请稍后重试')
      }
      return Promise.reject(error)
    }
  )

  return http
}

export const $my = createHttp('//my.domain.com')
