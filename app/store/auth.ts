import { defineStore } from 'pinia'

export type UserRole = 'guest' | 'user' | 'admin'

export interface User {
  id: number
  username: string
  role: UserRole
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  // ========== State ==========
  const user = ref<User | null>(null)
  
  // ========== Getters ==========
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isUser = computed(() => user.value?.role === 'user')
  
  // ========== Actions ==========
  
  /**
   * 登录
   */
  async function login(username: string, password: string) {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (username === 'admin' && password === 'admin123') {
      user.value = {
        id: 1,
        username: 'admin',
        role: 'admin',
        token: 'mock-admin-token-' + Date.now()
      }
      saveToStorage()
      return { success: true, message: '管理员登录成功' }
    } else if (username === 'user' && password === 'user123') {
      user.value = {
        id: 2,
        username: 'user',
        role: 'user',
        token: 'mock-user-token-' + Date.now()
      }
      saveToStorage()
      return { success: true, message: '用户登录成功' }
    } else {
      return { success: false, message: '用户名或密码错误' }
    }
  }
  
  /**
   * 登出
   */
  function logout() {
    user.value = null
    clearStorage()
  }
  
  /**
   * 检查权限
   */
  function hasPermission(requiredRole: UserRole): boolean {
    if (!user.value) return false
    
    const roleLevel = {
      guest: 0,
      user: 1,
      admin: 2
    }
    
    const userLevel = roleLevel[user.value.role]
    const requiredLevel = roleLevel[requiredRole]
    
    return userLevel >= requiredLevel
  }
  
  /**
   * 从 localStorage 恢复
   */
  function restoreAuth() {
    if (process.client) {
      const savedUser = localStorage.getItem('auth-user')
      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        } catch (e) {
          console.error('恢复用户信息失败:', e)
        }
      }
    }
  }
  
  /**
   * 保存到 localStorage
   */
  function saveToStorage() {
    if (process.client && user.value) {
      localStorage.setItem('auth-token', user.value.token)
      localStorage.setItem('auth-user', JSON.stringify(user.value))
    }
  }
  
  /**
   * 清除 localStorage
   */
  function clearStorage() {
    if (process.client) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('auth-user')
    }
  }
  
  return {
    // State
    user,
    // Getters
    isLoggedIn,
    isAdmin,
    isUser,
    // Actions
    login,
    logout,
    hasPermission,
    restoreAuth
  }
})