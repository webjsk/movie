/**
 * TMDB API 类型定义
 */

export interface TMDBMovie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  runtime: number
  genres: Array<{ id: number; name: string }>
  production_countries: Array<{ iso_3166_1: string; name: string }>
  revenue: number
  budget: number
  status: string
  tagline: string
}

export interface TMDBMovieListResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

