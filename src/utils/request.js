import axios from 'axios'
import Vue from 'vue'
import { getToken } from './token'
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// 携带cookies
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken()) {
    config.headers.token = getToken()
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
