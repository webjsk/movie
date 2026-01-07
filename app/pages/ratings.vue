<script setup lang="ts">
import { useRatingsStore } from "~/store/ratings";
import { GetMovieDetailSync } from "~/api/movie";
import Icon from "~/components/Icon.vue";

// ✅ 添加中间件：必须登录
definePageMeta({
  middleware: "auth",
});
const ratingsStore = useRatingsStore();

// 获取已评分电影的详情
const ratedMovieIds = computed(() => Object.keys(ratingsStore.ratings).map(Number));
const movies = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  if (ratedMovieIds.value.length === 0) {
    loading.value = false;
    return;
  }

  try {
    // ✅ 使用封装的 API 请求
    const results = await Promise.all(
      ratedMovieIds.value.map((id) =>
        GetMovieDetailSync(id)
      )
    );
    movies.value = results;
  } catch (error) {
    console.error("加载失败:", error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "我的评分",
  description: "我评分过的电影",
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

    <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 30px">
      <span style="display: flex; align-items: center; gap: 8px">
        <Icon name="mdi:star" size="32" color="#f59e0b" />
        我的评分 ({{ ratedMovieIds.length }})
      </span>
    </h1>

    <div v-if="loading" style="text-align: center; padding: 50px">
      加载中...
    </div>

    <div
      v-else-if="ratedMovieIds.length === 0"
      style="text-align: center; padding: 100px 20px; color: #666"
    >
      <Icon name="mdi:star-outline" size="48" color="#f59e0b" />
      <p style="font-size: 18px">还没有评分任何电影</p>
      <NuxtLink
        to="/"
        style="
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 8px;
        "
      >
        去评分
      </NuxtLink>
    </div>

    <div
      v-else
      style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
      "
    >
      <NuxtLink
        v-for="movie in movies"
        :key="movie.id"
        :to="`/movie/${movie.id}`"
        style="text-decoration: none; color: inherit"
      >
        <div
          style="transition: transform 0.2s"
          @mouseenter="$event.currentTarget.style.transform = 'scale(1.05)'"
          @mouseleave="$event.currentTarget.style.transform = 'scale(1)'"
        >
          <NuxtImg
            :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
            :alt="movie.title"
            width="300"
            height="450"
            format="webp"
            loading="lazy"
            :placeholder="[50, 75, 75, 5]"
            style="
              width: 100%;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            "
          />
          <h3 style="margin-top: 10px; font-weight: 600">
            {{ movie.title }}
          </h3>
          <p style="color: #666; font-size: 14px">
            <span style="display: flex; align-items: center; gap: 4px">
              我的评分: <Icon name="mdi:star" size="14" color="#f59e0b" />
              {{ ratingsStore.ratings[movie.id]?.toFixed(1) || '0.0' }}
            </span>
          </p>
          <p style="color: #999; font-size: 12px">
            TMDB: {{ movie.vote_average.toFixed(1) }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
