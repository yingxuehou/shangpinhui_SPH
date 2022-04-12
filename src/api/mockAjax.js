import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockRequest = axios.create({
  baseUrl: '/mock',
  timeout: 5000
})

mockRequest.interceptors.request.use(config => {
  nprogress.start()
  return config
})

mockRequest.interceptors.response.use(res => {
  nprogress.done()
  return res.data
})

export default mockRequest