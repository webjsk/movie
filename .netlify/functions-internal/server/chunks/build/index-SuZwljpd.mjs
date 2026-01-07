import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { a as useAuthStore, u as useSeoMeta, I as Icon } from './server.mjs';
import { storeToRefs } from 'pinia';
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
import 'vue-router';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    useSeoMeta({
      title: "管理后台",
      description: "电影网站管理后台"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "max-width": "1200px", "margin": "0 auto", "padding": "20px" } }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        style: { "display": "inline-block", "margin-bottom": "20px", "color": "#3b82f6", "text-decoration": "none" }
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
      _push(`<div style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "padding": "40px", "border-radius": "12px", "color": "white", "margin-bottom": "30px" })}"><h1 style="${ssrRenderStyle({ "font-size": "36px", "font-weight": "bold", "margin-bottom": "10px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:crown",
        size: "36",
        color: "white"
      }, null, _parent));
      _push(` 管理后台 </span></h1><p style="${ssrRenderStyle({ "font-size": "18px", "opacity": "0.9" })}"> 欢迎，${ssrInterpolate(unref(user)?.username)} 管理员 </p></div><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))", "gap": "20px" })}"><div style="${ssrRenderStyle({ "background": "white", "padding": "30px", "border-radius": "12px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:chart-bar",
        size: "48"
      }, null, _parent));
      _push(`<h3 style="${ssrRenderStyle({ "font-size": "20px", "font-weight": "600", "margin-bottom": "5px" })}"> 数据统计 </h3><p style="${ssrRenderStyle({ "color": "#666" })}">查看网站数据统计</p></div><div style="${ssrRenderStyle({ "background": "white", "padding": "30px", "border-radius": "12px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:account-group",
        size: "48"
      }, null, _parent));
      _push(`<h3 style="${ssrRenderStyle({ "font-size": "20px", "font-weight": "600", "margin-bottom": "5px" })}"> 用户管理 </h3><p style="${ssrRenderStyle({ "color": "#666" })}">管理网站用户</p></div><div style="${ssrRenderStyle({ "background": "white", "padding": "30px", "border-radius": "12px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:movie-open",
        size: "48"
      }, null, _parent));
      _push(`<h3 style="${ssrRenderStyle({ "font-size": "20px", "font-weight": "600", "margin-bottom": "5px" })}"> 内容管理 </h3><p style="${ssrRenderStyle({ "color": "#666" })}">管理电影内容</p></div><div style="${ssrRenderStyle({ "background": "white", "padding": "30px", "border-radius": "12px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:cog",
        size: "48"
      }, null, _parent));
      _push(`<h3 style="${ssrRenderStyle({ "font-size": "20px", "font-weight": "600", "margin-bottom": "5px" })}"> 系统设置 </h3><p style="${ssrRenderStyle({ "color": "#666" })}">网站配置设置</p></div></div><div style="${ssrRenderStyle({ "margin-top": "30px", "padding": "20px", "background": "#f9fafb", "border-radius": "12px" })}"><h2 style="${ssrRenderStyle({ "font-size": "24px", "font-weight": "bold", "margin-bottom": "15px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:information",
        size: "24"
      }, null, _parent));
      _push(` 说明 </span></h2><p style="${ssrRenderStyle({ "color": "#666", "line-height": "1.8" })}"> 这是管理后台页面，只有管理员才能访问。普通用户尝试访问会被拒绝。 </p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-SuZwljpd.mjs.map
