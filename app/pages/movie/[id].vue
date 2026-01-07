<script setup lang="ts">
  import { useFavoritesStore } from "~/store/favorites";
  import { useRatingsStore } from "~/store/ratings";
  import { GetMovieDetail } from "~/api/movie";
  import Icon from "~/components/Icon.vue";
  
  const route = useRoute();
  const ratingsStore = useRatingsStore();
  
  // ✅ 使用 Pinia Store
  const favoritesStore = useFavoritesStore();
  
  const movieId = route.params.id as string;
  
  // ✅ 使用封装的 API（已包含统一错误处理）
  const { data: movie, pending, error } = await GetMovieDetail(movieId);
  // ✅ 计算是否已收藏
  const isFavorited = computed(() => favoritesStore.isFavorite(Number(movieId)));
  // ✅ 切换收藏
  const handleToggleFavorite = () => {
    favoritesStore.toggle(Number(movieId))
  }
  // ✅ 获取用户评分
  const userRating = ref(ratingsStore.getRating(Number(movieId)));
  
  useSeoMeta({
    title: () => `${movie.value?.title} - 电影详情`,
    description: () => movie.value?.overview,
  });
  </script>
  
  <template>
    <div style="max-width: 1200px; margin: 0 auto; padding: 20px">
      <NuxtLink
        to="/"
        style="
          display: inline-block;
          margin-bottom: 20px;
          color: #3b82f6;
          text-decoration: none;
        "
      >
        <Icon name="mdi:chevron-left" size="16" />
        返回首页
      </NuxtLink>
  
      <div v-if="pending" style="text-align: center; padding: 50px">
        加载中...
      </div>
  
      <div v-else-if="error" style="color: red; padding: 20px">
        <span style="display: flex; align-items: center; gap: 8px">
          <Icon name="mdi:close-circle" size="20" color="#ef4444" />
          错误: {{ error.message }}
        </span>
      </div>
  
      <div v-else-if="movie" style="display: flex; gap: 40px; flex-wrap: wrap">
        <!-- 海报 -->
        <div style="flex: 0 0 300px">
          <NuxtImg
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            width="300"
            height="450"
            format="webp"
            :placeholder="[50, 75, 75, 5]"
            sizes="200px"
            style="
              width: 100%;
              border-radius: 8px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            "
          />
        </div>
  
        <div style="flex: 1; min-width: 300px">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: start;
              margin-bottom: 20px;
            "
          >
            <h1 style="font-size: 48px; font-weight: bold; flex: 1">
              {{ movie.title }}
            </h1>
  
            <button
              @click="handleToggleFavorite"
              :style="{
                padding: '12px 24px',
                fontSize: '18px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                background: isFavorited ? '#ef4444' : '#3b82f6',
                color: 'white',
                transition: 'all 0.2s',
              }"
            >
              <span style="display: flex; align-items: center; gap: 6px">
                <Icon :name="isFavorited ? 'mdi:heart' : 'mdi:heart-outline'" size="18" color="white" />
                {{ isFavorited ? "已收藏" : "收藏" }}
              </span>
            </button>
          </div>
  
          <div
            style="display: flex; gap: 20px; margin-bottom: 20px; font-size: 18px"
          >
            <span style="display: flex; align-items: center; gap: 4px">
              <Icon name="mdi:star" size="18" color="#fbbf24" />
              {{ movie.vote_average.toFixed(1) }} 分 (TMDB)
            </span>
            <span style="display: flex; align-items: center; gap: 4px">
              <Icon name="mdi:calendar" size="18" />
              {{ movie.release_date }}
            </span>
            <span style="display: flex; align-items: center; gap: 4px">
              <Icon name="mdi:clock-outline" size="18" />
              {{ movie.runtime }} 分钟
            </span>
          </div>
  
          <!-- ✅ 用户评分区域 -->
          <div
            style="
              background: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 30px;
            "
          >
            <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 15px">
              我的评分
            </h3>
            <StarRating v-model="userRating" :movie-id="Number(movieId)" />
          </div>
  
          <div style="margin-bottom: 30px">
            <span
              v-for="genre in movie.genres"
              :key="genre.id"
              style="
                display: inline-block;
                background: #3b82f6;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                margin-right: 10px;
                margin-bottom: 10px;
              "
            >
              {{ genre.name }}
            </span>
          </div>
  
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 15px">
            剧情简介
          </h2>
          <p style="line-height: 1.8; color: #333; font-size: 16px">
            {{ movie.overview || "暂无简介" }}
          </p>
  
          <div
            style="
              margin-top: 30px;
              padding: 20px;
              background: #f3f4f6;
              border-radius: 8px;
            "
          >
            <p style="margin-bottom: 10px">
              <strong>原始标题:</strong> {{ movie.original_title }}
            </p>
            <p style="margin-bottom: 10px">
              <strong>制作国家:</strong>
              {{ movie.production_countries?.map((c) => c.name).join(", ") }}
            </p>
            <p>
              <strong>票房:</strong> ${{
                movie.revenue?.toLocaleString() || "未知"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  