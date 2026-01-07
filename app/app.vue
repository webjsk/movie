<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { useFavoritesStore } from "~/store/favorites";
import { useRatingsStore } from "~/store/ratings";
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore()
const ratingsStore = useRatingsStore()
// ✅ 页面加载时恢复登录状态
onMounted(() => {
  authStore.restoreAuth();
  favoritesStore.restore();
  ratingsStore.restore();
});
</script>
