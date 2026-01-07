import { useApiGet } from '~/utils/apiClient'
import type { TMDBMovie, TMDBMovieListResponse } from '~/types/tmdb'

export const useTMDB = () => {
  const config = useRuntimeConfig();

  const baseURL = "https://api.themoviedb.org/3";
  const apiKey = config.public.tmdbApiKey;

  /**
   * 通用请求方法（封装了统一的配置）
   */
  const request = <T = any>(
    endpoint: string,
    options?: {
      query?: Record<string, any>
      customErrorMessage?: string
      key?: string
    }
  ) => {
    return useApiGet<T>(
      `${baseURL}${endpoint}`,
      {
        api_key: apiKey,
        language: "zh-CN",
        ...options?.query,
      },
      {
        key: options?.key || `tmdb-${endpoint}`,
        customErrorMessage: options?.customErrorMessage,
      }
    )
  }

  return {
    // 热门电影
    getPopular: () => request<TMDBMovieListResponse>('/movie/popular', {
      customErrorMessage: '获取热门电影失败',
      key: 'tmdb-/movie/popular',
    }),
    
    // 电影详情
    getMovie: (id: string) => request<TMDBMovie>(`/movie/${id}`, {
      customErrorMessage: '电影不存在或已下架',
    }),
    
    // 搜索电影
    searchMovies: (query: string) => request<TMDBMovieListResponse>('/search/movie', {
      query: { query },
      customErrorMessage: '搜索失败，请稍后重试',
      key: `search-${query}`,
    }),
  }
};
