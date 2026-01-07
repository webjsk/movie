<script setup lang="ts">
    import { GetMovieListByCategory } from '~/api/movie'
    import Icon from '~/components/Icon.vue'
    
    const route = useRoute()
    const categoryId = route.params.type as string
    
    // 分类映射
    const categories: Record<string, { id: number, name: string }> = {
      'action': { id: 28, name: '动作' },
      'comedy': { id: 35, name: '喜剧' },
      'drama': { id: 18, name: '剧情' },
      'horror': { id: 27, name: '恐怖' },
      'romance': { id: 10749, name: '爱情' },
      'scifi': { id: 878, name: '科幻' },
      'thriller': { id: 53, name: '惊悚' },
      'animation': { id: 16, name: '动画' }
    }
    
    const category = categories[categoryId]
    
    if (!category) {
      throw createError({
        statusCode: 404,
        message: '分类不存在'
      })
    }
    
    // ✅ 使用封装的 API 请求
    const page = ref(1)
    const { data: movies, pending, error } = await GetMovieListByCategory(category.id, page)
    
    const nextPage = () => {
      if (page.value < (movies.value?.total_pages || 1)) {
        page.value++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    const prevPage = () => {
      if (page.value > 1) {
        page.value--
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    useSeoMeta({
      title: `${category.name}电影`,
      description: `浏览热门${category.name}电影`
    })
    </script>
    
    <template>
      <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
        <NuxtLink to="/" style="display: inline-block; margin-bottom: 20px; color: #3b82f6; text-decoration: none;">
          <Icon name="mdi:chevron-left" size="16" />
          返回首页
        </NuxtLink>
    
        <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 30px;">
          {{ category.name }}电影
        </h1>
    
        <div v-if="pending" style="text-align: center; padding: 50px;">
          加载中...
        </div>
    
        <div v-else-if="error" style="color: red; padding: 20px;">
          <span style="display: flex; align-items: center; gap: 8px">
            <Icon name="mdi:close-circle" size="20" color="#ef4444" />
            错误: {{ error.message }}
          </span>
        </div>
    
        <div v-else>
          <div style="text-align: center; margin-bottom: 20px; color: #666;">
            第 {{ page }} 页 / 共 {{ movies?.total_pages || 0 }} 页
          </div>
    
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
            <NuxtLink 
              v-for="movie in movies?.results"
              :key="movie.id"
              :to="`/movie/${movie.id}`"
              style="text-decoration: none; color: inherit;"
            >
              <div style="transition: transform 0.2s;" @mouseenter="$event.currentTarget.style.transform = 'scale(1.05)'" @mouseleave="$event.currentTarget.style.transform = 'scale(1)'">
                <NuxtImg
                  v-if="movie.poster_path"
                  :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
                  :alt="movie.title"
                  width="300"
                  height="450"
                  format="webp"
                  loading="lazy"
                  style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
                />
                <div v-else style="width: 100%; height: 300px; background: #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  无海报
                </div>
                <h3 style="margin-top: 10px; font-weight: 600;">
                  {{ movie.title }}
                </h3>
                <p style="color: #666; font-size: 14px;">
                  <span style="display: flex; align-items: center; gap: 4px">
                    <Icon name="mdi:star" size="14" color="#fbbf24" />
                    {{ movie.vote_average.toFixed(1) }} | {{ movie.release_date }}
                  </span>
                </p>
              </div>
            </NuxtLink>
          </div>
    
          <!-- 分页 -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 40px;">
            <button
              @click="prevPage"
              :disabled="page === 1"
              :style="{
                padding: '12px 24px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                background: page === 1 ? '#d1d5db' : '#3b82f6',
                color: 'white'
              }"
            >
              <Icon name="mdi:chevron-left" size="20" color="white" />
              上一页
            </button>
    
            <span style="color: #666; font-weight: 600;">
              {{ page }} / {{ movies?.total_pages }}
            </span>
    
            <button
              @click="nextPage"
              :disabled="page >= (movies?.total_pages || 1)"
              :style="{
                padding: '12px 24px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: page >= (movies?.total_pages || 1) ? 'not-allowed' : 'pointer',
                background: page >= (movies?.total_pages || 1) ? '#d1d5db' : '#3b82f6',
                color: 'white'
              }"
            >
              下一页
              <Icon name="mdi:chevron-right" size="20" color="white" />
            </button>
          </div>
        </div>
      </div>
    </template>