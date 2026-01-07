/**
 * 通用 API 客户端工具
 * 封装 useFetch，提供统一的请求方法和错误处理
 */

import { handleApiError } from './apiError'
import type { UseFetchOptions } from 'nuxt/app'

/**
 * 通用请求方法（基于 useFetch）
 * 
 * @param url - 请求 URL
 * @param options - useFetch 选项
 * @param customErrorMessage - 自定义错误信息
 * @returns useFetch 返回的响应式对象
 * 
 * @example
 * // GET 请求
 * const { data, pending, error } = await useApiRequest('/api/users')
 * 
 * @example
 * // POST 请求
 * const { data } = await useApiRequest('/api/users', {
 *   method: 'POST',
 *   body: { name: 'John' }
 * })
 */
export function useApiRequest<T>(
  url: string,
  options?: UseFetchOptions<T> & {
    customErrorMessage?: string
  }
) {
  const { customErrorMessage, ...fetchOptions } = options || {}

  return useFetch<T>(url, {
    ...fetchOptions,
    // ✅ 统一错误处理
    onResponseError({ response }: { response: { status: number; statusText: string } }) {
      handleApiError(
        { 
          statusCode: response.status, 
          message: response.statusText 
        },
        customErrorMessage
      )
    },
  } as any) as ReturnType<typeof useFetch<T>>
}

/**
 * 通用 GET 请求（简化版）
 */
export function useApiGet<T = any>(
  url: string,
  query?: Record<string, any>,
  options?: Omit<UseFetchOptions<T>, 'method' | 'query'> & {
    customErrorMessage?: string
  }
) {
  return useApiRequest<T>(url, {
    ...options,
    method: 'GET',
    query,
  })
}

/**
 * 通用 POST 请求（简化版）
 */
export function useApiPost<T = any>(
  url: string,
  body?: any,
  options?: Omit<UseFetchOptions<T>, 'method' | 'body'> & {
    customErrorMessage?: string
  }
) {
  return useApiRequest<T>(url, {
    ...options,
    method: 'POST',
    body,
  })
}

/**
 * 通用 PUT 请求（简化版）
 */
export function useApiPut<T = any>(
  url: string,
  body?: any,
  options?: Omit<UseFetchOptions<T>, 'method' | 'body'> & {
    customErrorMessage?: string
  }
) {
  return useApiRequest<T>(url, {
    ...options,
    method: 'PUT',
    body,
  })
}

/**
 * 通用 DELETE 请求（简化版）
 */
export function useApiDelete<T = any>(
  url: string,
  options?: Omit<UseFetchOptions<T>, 'method'> & {
    customErrorMessage?: string
  }
) {
  return useApiRequest<T>(url, {
    ...options,
    method: 'DELETE',
  })
}

