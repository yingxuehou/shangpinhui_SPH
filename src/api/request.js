// import Vue from 'vue'
import axios from 'axios'
// 引入store
import store from '@/store'
// 引入nprogress
import nprogress from 'nprogress'
// 引入样式
import 'nprogress/nprogress.css'

// Vue.use(axios)

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use(config => {
  nprogress.start()
  // 请求头携带临时token:单例模式，使用本地存储
  // config.headers.userTempId = localStorage.getItem('uuidToken') ? localStorage.getItem('uuidToken') : getToken()
  config.headers.userTempId = store.state.detail.token
  // 请求头携带用户token
  store.state.user.token && (config.headers.token = store.state.user.token)
  return config
})

request.interceptors.response.use(res => {
  nprogress.done()
  return res.data
}, (error) => {
  nprogress.done()
  return Promise.reject(new Error(error))
})

export default request