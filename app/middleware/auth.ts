import { useAuthStore } from '~/store/auth'
export default defineNuxtRouteMiddleware((to, from) => {

  // ✅ 使用 Pinia Store
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})