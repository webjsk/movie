import { useAuthStore } from '~/store/auth'
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn) {
    return navigateTo('/login')
  }
  
  if (!authStore.isAdmin) {
    return abortNavigation({
      statusCode: 403,
      message: '需要管理员权限'
    })
  }
})