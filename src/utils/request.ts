import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI 后端地址
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从 localStorage 或 Pinia 中获取 token
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status === 401) {
        // Token 过期或无效，清除本地 token 并跳转到登录页
        localStorage.removeItem('access_token')
        window.location.href = '/login'
      } else if (status === 403) {
        // 例如：话题被锁定、删除权限不足等
        alert(error.response.data.detail || '权限不足')
      } else if (status === 404) {
        alert('请求的资源不存在')
      } else {
        alert(error.response.data.detail || '服务器请求错误')
      }
    }
    return Promise.reject(error)
  },
)

export default service
