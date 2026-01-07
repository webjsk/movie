<script setup lang="ts">
  import { useFavoritesStore } from "~/store/favorites";
  import { GetMovieDetailSync } from "~/api/movie";
  import Icon from "~/components/Icon.vue";
  
// ✅ 添加中间件：必须登录
definePageMeta({
  middleware: "auth",
});
const favoritesStore = useFavoritesStore();
const { favoriteIds } = storeToRefs(favoritesStore);

// 等待所有请求完成
const movies = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  if (favoriteIds.value.length === 0) {
    loading.value = false;
    return;
  }

  try {
    // ✅ 使用封装的 API 请求
    const results = await Promise.all(
      favoriteIds.value.map((id) =>
        GetMovieDetailSync(id)
      )
    );
    movies.value = results;
    console.log("收藏电影:", movies.value);
  } catch (error) {
    console.error("加载收藏失败:", error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "我的收藏",
  description: "我收藏的电影列表",
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
        <Icon name="mdi:heart" size="32" color="#ef4444" />
        我的收藏 ({{ favoriteIds.length }})
      </span>
    </h1>

    <div v-if="loading" style="text-align: center; padding: 50px">
      加载中...
    </div>

    <div
      v-else-if="favoriteIds.length === 0"
      style="text-align: center; padding: 100px 20px; color: #666"
    >
      <Icon name="mdi:movie-open" size="48" />
      <p style="font-size: 18px">还没有收藏任何电影</p>
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
        去发现电影
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
      <div v-for="movie in movies" :key="movie.id" style="position: relative">
        <NuxtLink
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
              loading="lazy"
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
                <Icon name="mdi:star" size="14" color="#fbbf24" />
                {{ movie.vote_average.toFixed(1) }} | {{ movie.release_date }}
              </span>
            </p>
          </div>
        </NuxtLink>

        <!-- ✅ 删除按钮 -->
        <button
          @click="favoritesStore.remove(movie.id)"
          style="
            position: absolute;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
          title="取消收藏"
        >
          <Icon name="mdi:close" size="24" color="white" />
        </button>
      </div>
    </div>
  </div>
</template>
