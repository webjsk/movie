/**
 * API 错误处理工具
 * 位置：app/utils/apiError.ts（工具函数放在 utils 目录是正确的）
 */

/**
 * 处理 API 错误
 */
export function handleApiError(error: any, customMessage?: string) {
  console.error("API Error:", error);

  // 根据错误类型返回不同的错误信息
  if (error.statusCode === 404) {
    throw createError({
      statusCode: 404,
      message: customMessage || "资源不存在",
    });
  } else if (error.statusCode === 403) {
    throw createError({
      statusCode: 403,
      message: customMessage || "无权访问",
    });
  } else if (error.statusCode === 401) {
    // 未登录，重定向到登录页
    navigateTo("/login");
  } else {
    throw createError({
      statusCode: 500,
      message: customMessage || "服务器错误，请稍后重试",
    });
  }
}


/**
 * 安全的数据获取（带错误处理）
 */
export async function safeFetch<T>(
  url: string, 
  options?: any,
  errorMessage?: string
): Promise<T> {
  const { data, error } = await useFetch<T>(url, options)
  
  if (error.value) {
    handleApiError(error.value, errorMessage)
  }
  
  if (!data.value) {
    throw createError({
      statusCode: 404,
      message: errorMessage || '数据不存在'
    })
  }
  
  return data.value as T
}
