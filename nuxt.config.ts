// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/image", "@pinia/nuxt"],
  // css: ['~/assets/css/main.css'],
  // 可选：如果你想在所有组件中自动引入 defineStore，可以配置 imports
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  // ✅ 添加图片优化配置
  image: {
    domains: ["image.tmdb.org"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
    // 图片质量
    quality: 80,
    // 格式
    format: ["webp", "jpg"],
  },
  // 运行时配置
  runtimeConfig: {
    // ========== 私有配置（仅服务端） ==========
    // 这些变量只在服务端可用，客户端访问会返回 undefined
    
    // API 密钥（敏感信息）
    tmdbApiKey: process.env.TMDB_API_KEY,
    
    // // 数据库连接（如果有）
    // databaseUrl: process.env.DATABASE_URL,
    
    // // JWT 密钥（如果有）
    // jwtSecret: process.env.JWT_SECRET,
    
    // ========== 公开配置（客户端也可用） ==========
    public: {
      // 环境标识
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      
      // 应用名称
      appName: process.env.NUXT_PUBLIC_APP_NAME || '电影网站',
      
      // API 地址
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      
      // CDN 地址
      cdnUrl: process.env.NUXT_PUBLIC_CDN_URL || '',
      
      // 调试开关
      enableDebug: process.env.NUXT_PUBLIC_ENABLE_DEBUG === 'true',
      
      // TMDB API 配置（客户端需要用）
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbApiBaseUrl: process.env.NUXT_PUBLIC_TMDB_API_BASE_URL,
    }

  },
  // ✅ 全局默认：SPA 模式
  // 这样后续添加的页面默认就是 SPA，无需单独配置
  // ssr: false,
  
  // 性能优化：渲染策略
  // 只配置需要 SSR 的页面，其他页面自动使用 SPA 模式
  routeRules: {
    // ✅ 需要 SEO 的页面：启用 SSR
    "/": { ssr: true },                    // 首页（SEO 重要）
    "/category/**": { ssr: true },         // 分类页（SEO 友好）
    
    // ✅ 电影详情：SWR 缓存 1 小时（提升性能，同时支持 SEO）
    "/movie/**": { ssr: true, swr: 3600 },
    
    // ❌ 以下页面不需要配置，会自动使用 SPA 模式（因为顶层 ssr: false）
    // 后续添加的页面（如 /settings, /profile, /dashboard 等）也会自动使用 SPA
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
    },
  },
});
