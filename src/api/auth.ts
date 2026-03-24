// src/api/auth.ts
import request from '@/utils/request'

// 给参数加上 string 类型，返回 Promise<any> (后续你可以替换为具体的 Pydantic 响应类型)
export const login = (username: string, password: string): Promise<any> => {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  return request({
    url: '/users/login',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

export const register = (data: any): Promise<any> => {
  return request({
    url: '/users/register',
    method: 'post',
    data, 
  })
}

export const getUserProfile = (): Promise<any> => {
  return request({
    url: '/users/me',
    method: 'get',
  })
}