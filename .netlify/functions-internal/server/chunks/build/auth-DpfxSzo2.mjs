import { m as defineNuxtRouteMiddleware, a as useAuthStore, n as navigateTo } from './server.mjs';
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

const auth = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }
});

export { auth as default };
//# sourceMappingURL=auth-DpfxSzo2.mjs.map
