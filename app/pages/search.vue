<script setup lang="ts">
import { SearchMovies } from '~/api/movie'
import Icon from '~/components/Icon.vue'

const route = useRoute();
const router = useRouter();

// 从 URL 获取关键词
const keyword = ref((route.query.q as string) || "");

const {
  data: results,
  pending,
  execute,
} = await SearchMovies(keyword, 1);

// 搜索函数
const handleSearch = () => {
  if (!keyword.value.trim()) return;
  // 更新 URL
  router.push({ query: { q: keyword.value } });
};

// 监听 URL 变化（浏览器前进后退）
watch(
  () => route.query.q,
  (newKeyword) => {
    if (newKeyword && newKeyword !== keyword.value) {
      keyword.value = newKeyword as string;
    }
  }
);

console.log("搜索结果:", results.value);
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

    <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 30px">
      <span style="display: flex; align-items: center; gap: 8px">
        <Icon name="mdi:magnify" size="32" />
        搜索电影
      </span>
    </h1>

    <!-- 搜索框 -->
    <div style="margin-bottom: 40px">
      <input
        v-model="keyword"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="输入电影名称..."
        style="
          width: 80%;
          padding: 15px 20px;
          font-size: 18px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
        "
      />
      <button
        @click="handleSearch"
        style="
          margin-top: 15px;
          padding: 12px 30px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        "
      >
        搜索
      </button>
    </div>

    <!-- 加载状态 -->
    <MovieSkeleton v-if="pending" />
    <!-- 无结果 -->
    <div
      v-else-if="!results?.results || results.results.length === 0"
      style="text-align: center; padding: 50px; color: #666"
    >
      <span style="display: flex; align-items: center; gap: 8px; justify-content: center">
        <Icon :name="keyword ? 'mdi:emoticon-sad' : 'mdi:hand-pointing-up'" size="24" />
        {{ keyword ? "没有找到相关电影" : "输入关键词开始搜索" }}
      </span>
    </div>

    <!-- 搜索结果 -->
    <div v-else>
      <p style="margin-bottom: 20px; color: #666">
        找到 {{ results.total_results }} 部电影
      </p>

      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        "
      >
        <NuxtLink
          v-for="movie in results.results"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          style="text-decoration: none; color: inherit"
        >
          <div
            style="transition: transform 0.2s"
            @mouseenter="$event.currentTarget.style.transform = 'scale(1.05)'"
            @mouseleave="$event.currentTarget.style.transform = 'scale(1)'"
          >
            <div v-if="movie.poster_path" style="position: relative">
              <NuxtImg
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                :alt="movie.title"
                width="300"
                height="450"
                format="webp"
                loading="lazy"
                :placeholder="[50, 75, 75, 5]"
                sizes="200px" 
                style="
                  width: 100%;
                  border-radius: 8px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                "
              />
            </div>
            <div
              v-else
              style="
                width: 100%;
                height: 300px;
                background: #e5e7eb;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #9ca3af;
              "
            >
              无海报
            </div>

            <h3 style="margin-top: 10px; font-weight: 600">
              {{ movie.title }}
            </h3>
            <p style="color: #666; font-size: 14px">
              <Icon name="mdi:star" size="14" color="#fbbf24" />
              {{ movie.vote_average ? movie.vote_average.toFixed(1) : "N/A" }}
              <span v-if="movie.release_date">| {{ movie.release_date }}</span>
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
