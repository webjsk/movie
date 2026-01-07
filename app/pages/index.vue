<script setup lang="ts">
// ✅ 使用 Pinia Store
import { useAuthStore } from '~/store/auth'
import { storeToRefs } from 'pinia'
import { GetMovieList } from '~/api/movie'
import Icon from '~/components/Icon.vue'

const authStore = useAuthStore()
// ✅ 使用 storeToRefs 保持响应式（只用于 state 和 getters）
const { user, isLoggedIn, isAdmin } = storeToRefs(authStore)
// ✅ Actions 可以直接解构（不会失去响应式）
const { logout } = authStore

const router = useRouter();
// ✅ 添加认证相关

const handleLogout = () => {
  logout();
  router.push("/");
};
// ✅ 添加页码状态
const page = ref(1);

// ✅ 使用封装的 API 请求（已包含统一错误处理和拦截器）
const {
  data: movies,
  pending,
  error,
} = GetMovieList(page);

// ✅ 翻页函数
const nextPage = () => {
  if (page.value < (movies.value?.total_pages || 1)) {
    page.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

useSeoMeta({
  title: "热门电影",
  description: "浏览最新最热门的电影",
});
</script>

<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 20px">
    <!-- 顶部导航 -->
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      "
    >
      <h1 style="font-size: 32px; font-weight: bold; display: flex; align-items: center; gap: 8px">
        <Icon name="mdi:movie" size="32" />
        热门电影
      </h1>

      <div style="display: flex; gap: 15px; align-items: center">
        <!-- ✅ 根据登录状态显示不同按钮 -->
        <template v-if="isLoggedIn">
          <!-- 用户信息 -->
          <span style="color: #666; display: flex; align-items: center; gap: 4px">
            <Icon name="mdi:account" size="16" />
            {{ user?.username }}
            <span
              v-if="isAdmin"
              style="
                background: #f59e0b;
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 12px;
                margin-left: 5px;
              "
            >
              管理员
            </span>
          </span>

          <!-- 管理后台（仅管理员） -->
          <NuxtLink
            v-if="isAdmin"
            to="/admin"
            style="
              padding: 10px 20px;
              background: #8b5cf6;
              color: white;
              text-decoration: none;
              border-radius: 8px;
            "
          >
            <Icon name="mdi:crown" size="18" />
            管理后台
          </NuxtLink>

          <!-- 我的评分 -->
          <NuxtLink
            to="/ratings"
            style="
              padding: 10px 20px;
              background: #f59e0b;
              color: white;
              text-decoration: none;
              border-radius: 8px;
            "
          >
            <Icon name="mdi:star" size="18" color="white" />
            我的评分
          </NuxtLink>

          <!-- 我的收藏 -->
          <NuxtLink
            to="/favorites"
            style="
              padding: 10px 20px;
              background: #ef4444;
              color: white;
              text-decoration: none;
              border-radius: 8px;
            "
          >
            <Icon name="mdi:heart" size="18" color="white" />
            我的收藏
          </NuxtLink>

          <!-- 登出 -->
          <button
            @click="handleLogout"
            style="
              padding: 10px 20px;
              background: #6b7280;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
            "
          >
            <Icon name="mdi:logout" size="18" color="white" />
            登出
          </button>
        </template>

        <template v-else>
          <!-- 未登录：显示登录按钮 -->
          <NuxtLink
            to="/login"
            style="
              padding: 10px 20px;
              background: #10b981;
              color: white;
              text-decoration: none;
              border-radius: 8px;
            "
          >
            <Icon name="mdi:lock" size="18" color="white" />
            登录
          </NuxtLink>
        </template>

        <!-- 搜索（所有人可用） -->
        <NuxtLink
          to="/search"
          style="
            padding: 10px 20px;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
          "
        >
          <Icon name="mdi:magnify" size="18" color="white" />
          搜索电影
        </NuxtLink>
      </div>
    </div>
    <!-- ✅ 分类导航 -->
    <div
      style="
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e7eb;
      "
    >
      <NuxtLink
        to="/category/action"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
          transition: all 0.2s;
        "
        @mouseenter="$event.target.style.background = '#e5e7eb'"
        @mouseleave="$event.target.style.background = '#f3f4f6'"
      >
        <Icon name="mdi:movie-open" size="16" />
        动作
      </NuxtLink>
      <NuxtLink
        to="/category/comedy"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:emoticon-happy" size="16" />
        喜剧
      </NuxtLink>
      <NuxtLink
        to="/category/drama"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:drama-masks" size="16" />
        剧情
      </NuxtLink>
      <NuxtLink
        to="/category/horror"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:ghost" size="16" />
        恐怖
      </NuxtLink>
      <NuxtLink
        to="/category/romance"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:heart" size="16" />
        爱情
      </NuxtLink>
      <NuxtLink
        to="/category/scifi"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:rocket-launch" size="16" />
        科幻
      </NuxtLink>
      <NuxtLink
        to="/category/thriller"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:emoticon-frown" size="16" />
        惊悚
      </NuxtLink>
      <NuxtLink
        to="/category/animation"
        style="
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
        "
      >
        <Icon name="mdi:palette" size="16" />
        动画
      </NuxtLink>
    </div>
    <!-- ✅ 页码信息 -->
    <div style="text-align: center; margin-bottom: 20px; color: #666">
      第 {{ page }} 页 / 共 {{ movies?.total_pages || 0 }} 页 （总共
      {{ movies?.total_results || 0 }} 部电影）
    </div>

    <MovieSkeleton v-if="pending" />

    <div v-else-if="error" style="color: red; padding: 20px">
      <span style="display: flex; align-items: center; gap: 8px">
        <Icon name="mdi:close-circle" size="20" color="#ef4444" />
        错误: {{ error.message }}
      </span>
    </div>

    <div v-else>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        "
      >
        <NuxtLink
          v-for="(movie, index) in movies?.results"
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
              :loading="index < 4 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
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
                <Icon name="mdi:star" size="14" color="#fbbf24" />
                {{ movie.vote_average.toFixed(1) }} | {{ movie.release_date }}
              </span>
            </p>
          </div>
        </NuxtLink>
      </div>

      <!-- ✅ 分页按钮 -->
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 40px;
        "
      >
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
            color: 'white',
            opacity: page === 1 ? 0.5 : 1,
          }"
        >
          <Icon name="mdi:chevron-left" size="20" color="white" />
          上一页
        </button>

        <span style="color: #666; font-weight: 600">
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
            cursor:
              page >= (movies?.total_pages || 1) ? 'not-allowed' : 'pointer',
            background:
              page >= (movies?.total_pages || 1) ? '#d1d5db' : '#3b82f6',
            color: 'white',
            opacity: page >= (movies?.total_pages || 1) ? 0.5 : 1,
          }"
        >
          下一页
          <Icon name="mdi:chevron-right" size="20" color="white" />
        </button>
      </div>
    </div>
  </div>
</template>
