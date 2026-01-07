import { defineStore } from 'pinia'

export const useRatingsStore = defineStore('ratings', () => {
  // ========== State ==========
  const ratings = ref<Record<number, number>>({})
  
  // ========== Getters ==========
  const count = computed(() => Object.keys(ratings.value).length)
  
  const getRating = computed(() => {
    return (movieId: number) => ratings.value[movieId] || 0
  })
  
  // ========== Actions ==========
  
  /**
   * 设置评分
   */
  function setRating(movieId: number, rating: number) {
    ratings.value[movieId] = rating
    saveToStorage()
  }
  
  /**
   * 移除评分
   */
  function removeRating(movieId: number) {
    delete ratings.value[movieId]
    saveToStorage()
  }
  
  /**
   * 清空评分
   */
  function clear() {
    ratings.value = {}
    clearStorage()
  }
  
  /**
   * 从 localStorage 恢复
   */
  function restore() {
    if (process.client) {
      const saved = localStorage.getItem('movie-ratings')
      if (saved) {
        try {
          ratings.value = JSON.parse(saved)
        } catch (e) {
          console.error('恢复评分失败:', e)
        }
      }
    }
  }
  
  /**
   * 保存到 localStorage
   */
  function saveToStorage() {
    if (process.client) {
      localStorage.setItem('movie-ratings', JSON.stringify(ratings.value))
    }
  }
  
  /**
   * 清除 localStorage
   */
  function clearStorage() {
    if (process.client) {
      localStorage.removeItem('movie-ratings')
    }
  }
  
  return {
    // State
    ratings,
    // Getters
    count,
    getRating,
    // Actions
    setRating,
    removeRating,
    clear,
    restore
  }
})