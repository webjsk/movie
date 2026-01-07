<script setup lang="ts">
import { useRatingsStore } from "~/store/ratings";
import Icon from "~/components/Icon.vue";
const props = defineProps<{
  modelValue: number; // 当前评分 0-10
  movieId: number;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

const ratingsStore = useRatingsStore();

// 悬停的星星
const hoveredStar = ref(0);

// 点击评分
const rate = (star: number) => {
  const rating = star * 2; // 转换为 0-10 分
  ratingsStore.setRating(props.movieId, rating);
  emit("update:modelValue", rating);
};

// 显示的分数（0-5星）
const displayRating = computed(() => Math.round(props.modelValue / 2));
</script>

<template>
  <div style="display: flex; align-items: center; gap: 8px">
    <div style="display: flex; gap: 4px">
      <span
        v-for="star in 5"
        :key="star"
        @click="rate(star)"
        @mouseenter="hoveredStar = star"
        @mouseleave="hoveredStar = 0"
        :style="{
          fontSize: '24px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          transform: hoveredStar === star ? 'scale(1.2)' : 'scale(1)',
        }"
      >
        <Icon 
          :name="hoveredStar >= star || displayRating >= star ? 'mdi:star' : 'mdi:star-outline'" 
          size="24" 
          :color="hoveredStar >= star || displayRating >= star ? '#fbbf24' : '#d1d5db'"
        />
      </span>
    </div>
    <span style="color: #666; font-size: 14px">
      {{ modelValue > 0 ? `${modelValue.toFixed(1)} 分` : "点击评分" }}
    </span>
  </div>
</template>
