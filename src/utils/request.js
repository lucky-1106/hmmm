import axios from 'axios'
import Vue from 'vue'
import { getToken, removeToken } from './token'
import { Message } from 'element-ui'
import router from '@/router/index'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// 携带cookies
axios.defaults.withCredentials = true
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (getToken()) {
      config.headers.token = getToken()
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.code === 206) {
      // 提示
      // Vue.prototype.$message.error('token过期')
      // console.log(response.data.code)
      Message.error('token过期了！请重新登录')
      // 清空token
      removeToken()

      // 跳转到登录
      router.push('/login')
    }
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = axios
