/**
 * 电影相关 API
 */
import { useAPIGet, useAPIPost, apiGet } from '~/composables/useAPI'
import { useAuthStore } from '~/store/auth'
import type { TMDBMovie, TMDBMovieListResponse } from '~/types/tmdb'

/**
 * 获取热门电影列表
 */
export function GetMovieList(page: Ref<number> | number = 1) {
  const pageRef = typeof page === 'number' ? ref(page) : page
  return useAPIGet<TMDBMovieListResponse>('/movie/popular', { page: pageRef }, {
    watch: [pageRef],
    key: computed(() => `movie-popular-${unref(pageRef)}`)
  })
}

/**
 * 获取电影详情
 */
export function GetMovieDetail(id: number | string) {
  return useAPIGet<TMDBMovie>(`/movie/${id}`, undefined, {
    key: `movie-detail-${id}`
  })
}

/**
 * 搜索电影
 */
export function SearchMovies(keyword: Ref<string> | string, page: Ref<number> | number = 1) {
  const keywordRef = typeof keyword === 'string' ? ref(keyword) : keyword
  const pageRef = typeof page === 'number' ? ref(page) : page
  return useAPIGet<TMDBMovieListResponse>('/search/movie', {
    query: keywordRef,
    page: pageRef
  }, {
    watch: [keywordRef, pageRef],
    key: computed(() => `search-movie-${unref(keywordRef)}-${unref(pageRef)}`)
  })
}

/**
 * 获取分类电影列表
 */
export function GetMovieListByCategory(genreId: number, page: Ref<number> | number = 1) {
  const pageRef = typeof page === 'number' ? ref(page) : page
  return useAPIGet<TMDBMovieListResponse>('/discover/movie', {
    with_genres: genreId,
    page: pageRef,
    sort_by: 'popularity.desc'
  }, {
    watch: [pageRef],
    key: computed(() => `movie-category-${genreId}-${unref(pageRef)}`)
  })
}

/**
 * 获取电影评论（示例：如果有自己的后端）
 */
export function GetMovieComments(movieId: number) {
  return useAPIGet(`/api/comments/${movieId}`)
}

/**
 * 添加电影评论（示例：POST 请求）
 */
export function AddMovieComment(movieId: number, comment: string) {
  const authStore = useAuthStore()
  return useAPIPost('/api/comments', {
    movieId,
    comment,
    userId: authStore.user?.id
  })
}

/**
 * 获取电影详情（同步版本，用于批量请求）
 */
export async function GetMovieDetailSync(id: number | string): Promise<TMDBMovie> {
  return await apiGet<TMDBMovie>(`/movie/${id}`)
}