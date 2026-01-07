import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', () => {
  // ========== State ==========
  const favoriteIds = ref<number[]>([])
  
  // ========== Getters ==========
  const count = computed(() => favoriteIds.value.length)
  
  const isFavorite = computed(() => {
    return (movieId: number) => favoriteIds.value.includes(movieId)
  })
  
  // ========== Actions ==========
  
  /**
   * 添加收藏
   */
  function add(movieId: number) {
    if (!favoriteIds.value.includes(movieId)) {
      favoriteIds.value.push(movieId)
      saveToStorage()
    }
  }
  
  /**
   * 移除收藏
   */
  function remove(movieId: number) {
    const index = favoriteIds.value.indexOf(movieId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
      saveToStorage()
    }
  }
  
  /**
   * 切换收藏状态
   */
  function toggle(movieId: number) {
    if (isFavorite.value(movieId)) {
      remove(movieId)
    } else {
      add(movieId)
    }
  }
  
  /**
   * 清空收藏
   */
  function clear() {
    favoriteIds.value = []
    clearStorage()
  }
  
  /**
   * 从 localStorage 恢复
   */
  function restore() {
    if (process.client) {
      const saved = localStorage.getItem('movie-favorites')
      if (saved) {
        try {
          favoriteIds.value = JSON.parse(saved)
        } catch (e) {
          console.error('恢复收藏失败:', e)
        }
      }
    }
  }
  
  /**
   * 保存到 localStorage
   */
  function saveToStorage() {
    if (process.client) {
      localStorage.setItem('movie-favorites', JSON.stringify(favoriteIds.value))
    }
  }
  
  /**
   * 清除 localStorage
   */
  function clearStorage() {
    if (process.client) {
      localStorage.removeItem('movie-favorites')
    }
  }
  
  return {
    // State
    favoriteIds,
    // Getters
    count,
    isFavorite,
    // Actions
    add,
    remove,
    toggle,
    clear,
    restore
  }
})