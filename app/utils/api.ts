/**
 * 获取默认参数（TMDB API）
 */
function getDefaultParams() {
  const config = useRuntimeConfig();
  return {
    api_key: config.public.tmdbApiKey,
    language: "zh-CN",
  };
}

/**
 * 请求拦截器：添加通用参数
 */
export function onRequest({ request, options }: any) {
  // 1️⃣ 添加默认参数（仅对 TMDB API）
  const config = useRuntimeConfig()
  const tmdbBaseUrl = (config.public.tmdbApiBaseUrl || 'https://api.themoviedb.org/3') as string
  const tmdbDomain = tmdbBaseUrl.replace('https://', '').replace('http://', '')
  if (typeof request === "string" && request.includes(tmdbDomain)) {
    const defaultParams = getDefaultParams();

    if (options.query) {
      options.query = { ...defaultParams, ...options.query };
    } else {
      options.query = defaultParams;
    }
  }

  // 2️⃣ 添加 Token（如果已登录）
  // 注意：在拦截器中不能直接使用 composables，需要在调用时处理
  // Token 添加逻辑应该在具体的 API 调用中处理

  // 3️⃣ 开发环境日志
  if (process.dev) {
    console.log("🚀 API Request:", request);
    console.log("📦 Options:", options);
  }
}

/**
 * 响应拦截器：统一处理响应
 */
export function onResponse({ response }: any) {
  // 开发环境日志
  if (process.dev) {
    console.log("✅ API Response:", response._data);
  }

  return response._data;
}

/**
 * 错误拦截器：统一处理错误
 */
export function onResponseError({ response }: any) {
  // 使用 createError 而不是 toast（Nuxt 推荐方式）

  // 开发环境日志
  if (process.dev) {
    console.error("❌ API Error:", response);
  }

  // 根据状态码处理
  switch (response.status) {
    case 401:
      // 未登录
      navigateTo("/login");
      throw createError({
        statusCode: 401,
        message: "请先登录",
      });

    case 403:
      // 无权限
      throw createError({
        statusCode: 403,
        message: "无权访问",
      });

    case 404:
      // 资源不存在
      throw createError({
        statusCode: 404,
        message: "资源不存在",
      });

    case 500:
      // 服务器错误
      throw createError({
        statusCode: 500,
        message: "服务器错误，请稍后重试",
      });

    default:
      // 其他错误
      const message = response._data?.message || "请求失败";
      throw createError({
        statusCode: response.status,
        message,
      });
  }
}
