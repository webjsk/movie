<script setup lang="ts">
  // ✅ 使用 Pinia Store
  import { useAuthStore } from '~/store/auth'
  import Icon from '~/components/Icon.vue'
  const authStore = useAuthStore()
  const router = useRouter()
  
  // 如果已登录，重定向
  if (authStore.isLoggedIn) {
    navigateTo('/')
  }
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref('')
  const loading = ref(false)
  
  const handleLogin = async () => {
    if (!username.value || !password.value) {
      errorMessage.value = '请输入用户名和密码'
      return
    }
    
    loading.value = true
    errorMessage.value = ''
    
    try {
      // ✅ 调用 store 的 action
      const result = await authStore.login(username.value, password.value)
      
      if (result.success) {
        await router.push('/')
      } else {
        errorMessage.value = result.message
      }
    } catch (error) {
      errorMessage.value = '登录失败，请重试'
    } finally {
      loading.value = false
    }
  }
  
  definePageMeta({
    middleware: 'guest'
  })
  
  useSeoMeta({
    title: '登录',
    description: '用户登录页面'
  })
  </script>
<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    "
  >
    <div
      style="
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 400px;
      "
    >
      <h1 style="text-align: center; margin-bottom: 30px; color: #333">
        <span style="display: flex; align-items: center; justify-content: center; gap: 8px">
          <Icon name="mdi:movie" size="32" />
          电影网站登录
        </span>
      </h1>

      <!-- 提示信息 -->
      <div
        style="
          background: #f0f9ff;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #0369a1;
        "
      >
        <p style="margin: 0 0 5px 0"><strong>测试账号：</strong></p>
        <p style="margin: 0; display: flex; align-items: center; gap: 4px">
          <Icon name="mdi:account" size="16" />
          普通用户: user / user123
        </p>
        <p style="margin: 5px 0 0 0; display: flex; align-items: center; gap: 4px">
          <Icon name="mdi:crown" size="16" />
          管理员: admin / admin123
        </p>
      </div>

      <form @submit.prevent="handleLogin">
        <div style="margin-bottom: 20px">
          <label
            style="
              display: block;
              margin-bottom: 8px;
              color: #666;
              font-weight: 600;
            "
          >
            用户名
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            style="
              width: 100%;
              padding: 12px;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              font-size: 16px;
              outline: none;
            "
            :style="{ borderColor: errorMessage ? '#ef4444' : '#e5e7eb' }"
          />
        </div>

        <div style="margin-bottom: 20px">
          <label
            style="
              display: block;
              margin-bottom: 8px;
              color: #666;
              font-weight: 600;
            "
          >
            密码
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            style="
              width: 100%;
              padding: 12px;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              font-size: 16px;
              outline: none;
            "
            :style="{ borderColor: errorMessage ? '#ef4444' : '#e5e7eb' }"
          />
        </div>

        <!-- 错误提示 -->
        <div
          v-if="errorMessage"
          style="
            background: #fee2e2;
            color: #dc2626;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
          "
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          style="
            width: 100%;
            padding: 14px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          "
          :style="{
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }"
        >
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </form>

      <div style="text-align: center; margin-top: 20px">
        <NuxtLink to="/" style="color: #3b82f6; text-decoration: none">
          <Icon name="mdi:chevron-left" size="16" />
          返回首页
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
