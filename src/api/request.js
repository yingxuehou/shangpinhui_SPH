// import Vue from 'vue'
import axios from 'axios'
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