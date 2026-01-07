<script setup lang="ts">
import Icon from '~/components/Icon.vue'

useSeoMeta({
  title: "403 - 无权访问",
  description: "您没有权限访问此页面",
});
</script>

<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    "
  >
    <div style="text-align: center">
      <Icon name="mdi:block" size="120" color="#ef4444" />
      <h1
        style="
          font-size: 48px;
          font-weight: bold;
          color: #ef4444;
          margin-bottom: 10px;
        "
      >
        403
      </h1>
      <p style="font-size: 24px; color: #666; margin-bottom: 30px">
        无权访问此页面
      </p>
      <p style="color: #999; margin-bottom: 30px">
        您需要更高的权限才能访问此页面
      </p>
      <NuxtLink
        to="/"
        style="
          display: inline-block;
          padding: 12px 30px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 8px;
        "
      >
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>
