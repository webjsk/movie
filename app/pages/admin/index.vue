<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import Icon from "~/components/Icon.vue";
// ✅ 需要管理员权限
definePageMeta({
  middleware: "admin",
});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

useSeoMeta({
  title: "管理后台",
  description: "电影网站管理后台",
});
</script>

<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 20px">
    <NuxtLink to="/" style="
        display: inline-block;
        margin-bottom: 20px;
        color: #3b82f6;
        text-decoration: none;
      ">
      <Icon name="mdi:chevron-left" size="16" />
      返回首页
    </NuxtLink>

    <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px;
        border-radius: 12px;
        color: white;
        margin-bottom: 30px;
      ">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 10px">
        <span style="display: flex; align-items: center; gap: 8px">
          <Icon name="mdi:crown" size="36" color="white" />
          管理后台
        </span>
      </h1>
      <p style="font-size: 18px; opacity: 0.9">
        欢迎，{{ user?.username }} 管理员
      </p>
    </div>

    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      ">
      <!-- 统计卡片 -->
      <div style="
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
        <Icon name="mdi:chart-bar" size="48" />
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 5px">
          数据统计
        </h3>
        <p style="color: #666">查看网站数据统计</p>
      </div>

      <div style="
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
        <Icon name="mdi:account-group" size="48" />
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 5px">
          用户管理
        </h3>
        <p style="color: #666">管理网站用户</p>
      </div>

      <div style="
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
        <Icon name="mdi:movie-open" size="48" />
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 5px">
          内容管理
        </h3>
        <p style="color: #666">管理电影内容</p>
      </div>

      <div style="
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
        <Icon name="mdi:cog" size="48" />
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 5px">
          系统设置
        </h3>
        <p style="color: #666">网站配置设置</p>
      </div>
    </div>

    <div style="
        margin-top: 30px;
        padding: 20px;
        background: #f9fafb;
        border-radius: 12px;
      ">
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 15px">
        <span style="display: flex; align-items: center; gap: 8px">
          <Icon name="mdi:information" size="24" />
          说明
        </span>
      </h2>
      <p style="color: #666; line-height: 1.8">
        这是管理后台页面，只有管理员才能访问。普通用户尝试访问会被拒绝。
      </p>
    </div>
  </div>
</template>
