import { m as defineNuxtRouteMiddleware, a as useAuthStore, n as navigateTo, o as abortNavigation } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import 'vue/server-renderer';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const admin = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    return navigateTo("/login");
  }
  if (!authStore.isAdmin) {
    return abortNavigation({
      statusCode: 403,
      message: "需要管理员权限"
    });
  }
});

export { admin as default };
//# sourceMappingURL=admin-BKvOZhBj.mjs.map
