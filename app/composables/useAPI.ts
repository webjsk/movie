import type { UseFetchOptions } from 'nuxt/app'
import { createOnRequest, onResponse, onResponseError } from '~/utils/api'

/**
 * 获取完整 URL（如果是完整 URL 则直接返回，否则拼接 baseURL）
 */
function getFullUrl(endpoint: string, baseURL: string): string {
  // 如果已经是完整 URL，直接返回
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint
  }
  
  // 否则使用传入的 baseURL
  return `${baseURL}${endpoint}`
}

/**
 * 封装的 API 请求函数
 */
export function useAPI<T = any>(
  endpoint: string,
  options: UseFetchOptions<T> = {}
) {
  // ✅ 在 composable 内部获取 config（确保在 Nuxt 上下文中）
  const config = useRuntimeConfig()
  const baseURL = config.public.tmdbApiBaseUrl || 'https://api.themoviedb.org/3'
  const fullUrl = getFullUrl(endpoint, baseURL)
  
  // ✅ 创建请求拦截器（通过闭包传递配置）
  const requestInterceptor = createOnRequest({
    tmdbApiKey: config.public.tmdbApiKey || '',
    tmdbApiBaseUrl: config.public.tmdbApiBaseUrl || 'https://api.themoviedb.org/3'
  })
  
  return useFetch<T>(fullUrl, {
    ...options,
    // ✅ 请求拦截（使用创建的拦截器）
    onRequest: requestInterceptor,
    
    // ✅ 响应拦截
    onResponse,
    
    // ✅ 错误拦截
    onResponseError
  } as any) as ReturnType<typeof useFetch<T>>
}

/**
 * GET 请求（语法糖）
 */
export function useAPIGet<T = any>(
  endpoint: string,
  params?: Record<string, any>,
  options: UseFetchOptions<T> = {}
) {
  return useAPI<T>(endpoint, {
    ...options,
    method: 'GET',
    query: params
  })
}

/**
 * POST 请求（语法糖）
 */
export function useAPIPost<T = any>(
  endpoint: string,
  body?: any,
  options: UseFetchOptions<T> = {}
) {
  return useAPI<T>(endpoint, {
    ...options,
    method: 'POST',
    body
  })
}

/**
 * PUT 请求（语法糖）
 */
export function useAPIPut<T = any>(
  endpoint: string,
  body?: any,
  options: UseFetchOptions<T> = {}
) {
  return useAPI<T>(endpoint, {
    ...options,
    method: 'PUT',
    body
  })
}

/**
 * DELETE 请求（语法糖）
 */
export function useAPIDelete<T = any>(
  endpoint: string,
  options: UseFetchOptions<T> = {}
) {
  return useAPI<T>(endpoint, {
    ...options,
    method: 'DELETE'
  })
}

/**
 * 同步 GET 请求（基于 $fetch，用于非响应式场景）
 * 适用于 onMounted、事件处理等场景
 */
export async function apiGet<T = any>(
  endpoint: string,
  params?: Record<string, any>
): Promise<T> {
  // ✅ 在函数内部获取 config（确保在 Nuxt 上下文中）
  const config = useRuntimeConfig()
  const baseURL = config.public.tmdbApiBaseUrl || 'https://api.themoviedb.org/3'
  const fullUrl = getFullUrl(endpoint, baseURL)
  const apiKey = config.public.tmdbApiKey || ''
  
  // 构建查询参数
  const query = {
    api_key: apiKey,
    language: 'zh-CN',
    ...params
  }
  
  try {
    return await $fetch<T>(fullUrl, {
      method: 'GET',
      query
    })
  } catch (error: any) {
    // 统一错误处理
    if (error.statusCode === 404) {
      throw createError({
        statusCode: 404,
        message: '资源不存在'
      })
    } else if (error.statusCode === 403) {
      throw createError({
        statusCode: 403,
        message: '无权访问'
      })
    } else if (error.statusCode === 401) {
      navigateTo('/login')
      throw createError({
        statusCode: 401,
        message: '请先登录'
      })
    } else {
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.message || '请求失败'
      })
    }
  }
}