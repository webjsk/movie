import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useAuthStore, b as useRouter, n as navigateTo, u as useSeoMeta, I as Icon } from './server.mjs';
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
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    useRouter();
    if (authStore.isLoggedIn) {
      navigateTo("/");
    }
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const loading = ref(false);
    useSeoMeta({
      title: "登录",
      description: "用户登录页面"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "min-height": "100vh", "display": "flex", "align-items": "center", "justify-content": "center", "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" } }, _attrs))}><div style="${ssrRenderStyle({ "background": "white", "padding": "40px", "border-radius": "12px", "box-shadow": "0 10px 40px rgba(0, 0, 0, 0.2)", "width": "100%", "max-width": "400px" })}"><h1 style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "30px", "color": "#333" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "center", "gap": "8px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:movie",
        size: "32"
      }, null, _parent));
      _push(` 电影网站登录 </span></h1><div style="${ssrRenderStyle({ "background": "#f0f9ff", "padding": "15px", "border-radius": "8px", "margin-bottom": "20px", "font-size": "14px", "color": "#0369a1" })}"><p style="${ssrRenderStyle({ "margin": "0 0 5px 0" })}"><strong>测试账号：</strong></p><p style="${ssrRenderStyle({ "margin": "0", "display": "flex", "align-items": "center", "gap": "4px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:account",
        size: "16"
      }, null, _parent));
      _push(` 普通用户: user / user123 </p><p style="${ssrRenderStyle({ "margin": "5px 0 0 0", "display": "flex", "align-items": "center", "gap": "4px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:crown",
        size: "16"
      }, null, _parent));
      _push(` 管理员: admin / admin123 </p></div><form><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><label style="${ssrRenderStyle({ "display": "block", "margin-bottom": "8px", "color": "#666", "font-weight": "600" })}"> 用户名 </label><input${ssrRenderAttr("value", unref(username))} type="text" placeholder="请输入用户名" style="${ssrRenderStyle([{ "width": "100%", "padding": "12px", "border": "2px solid #e5e7eb", "border-radius": "8px", "font-size": "16px", "outline": "none" }, { borderColor: unref(errorMessage) ? "#ef4444" : "#e5e7eb" }])}"></div><div style="${ssrRenderStyle({ "margin-bottom": "20px" })}"><label style="${ssrRenderStyle({ "display": "block", "margin-bottom": "8px", "color": "#666", "font-weight": "600" })}"> 密码 </label><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="请输入密码" style="${ssrRenderStyle([{ "width": "100%", "padding": "12px", "border": "2px solid #e5e7eb", "border-radius": "8px", "font-size": "16px", "outline": "none" }, { borderColor: unref(errorMessage) ? "#ef4444" : "#e5e7eb" }])}"></div>`);
      if (unref(errorMessage)) {
        _push(`<div style="${ssrRenderStyle({ "background": "#fee2e2", "color": "#dc2626", "padding": "12px", "border-radius": "8px", "margin-bottom": "20px" })}">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} style="${ssrRenderStyle([{ "width": "100%", "padding": "14px", "background": "#3b82f6", "color": "white", "border": "none", "border-radius": "8px", "font-size": "16px", "font-weight": "600", "cursor": "pointer", "transition": "all 0.2s" }, {
        opacity: unref(loading) ? 0.6 : 1,
        cursor: unref(loading) ? "not-allowed" : "pointer"
      }])}">${ssrInterpolate(unref(loading) ? "登录中..." : "登录")}</button></form><div style="${ssrRenderStyle({ "text-align": "center", "margin-top": "20px" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "color": "#3b82f6", "text-decoration": "none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:chevron-left",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 返回首页 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:chevron-left",
                size: "16"
              }),
              createTextVNode(" 返回首页 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-OEDDTrTV.mjs.map
