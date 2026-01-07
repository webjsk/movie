/**
 * 用户相关 API
 */
import { useAPIGet, useAPIPost, useAPIPut } from '~/composables/useAPI'

/**
 * 获取用户信息
 */
export function GetUserProfile() {
  return useAPIGet('/api/user/profile', undefined, {
    key: 'user-profile'
  })
}

/**
 * 更新用户信息
 */
export function UpdateUserProfile(data: any) {
  return useAPIPut('/api/user/profile', data)
}

/**
 * 上传头像
 */
export function UploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('avatar', file)
  
  return useAPIPost('/api/user/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}