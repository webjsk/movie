import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { _ as __nuxt_component_1 } from './MovieSkeleton-Crx0Bu_C.mjs';
import { _ as __nuxt_component_1$1 } from './NuxtImg-D_HxLKuI.mjs';
import { defineComponent, ref, withAsyncContext, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, openBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { S as SearchMovies } from './movie-D9X_Omhe.mjs';
import { c as useRoute, b as useRouter, I as Icon } from './server.mjs';
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
import '@vue/shared';
import 'perfect-debounce';
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
  __name: "search",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const keyword = ref(route.query.q || "");
    const {
      data: results,
      pending,
      execute
    } = ([__temp, __restore] = withAsyncContext(() => SearchMovies(keyword, 1)), __temp = await __temp, __restore(), __temp);
    watch(
      () => route.query.q,
      (newKeyword) => {
        if (newKeyword && newKeyword !== keyword.value) {
          keyword.value = newKeyword;
        }
      }
    );
    console.log("搜索结果:", results.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MovieSkeleton = __nuxt_component_1;
      const _component_NuxtImg = __nuxt_component_1$1;
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
      _push(`<h1 style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "bold", "margin-bottom": "30px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:magnify",
        size: "32"
      }, null, _parent));
      _push(` 搜索电影 </span></h1><div style="${ssrRenderStyle({ "margin-bottom": "40px" })}"><input${ssrRenderAttr("value", unref(keyword))} type="text" placeholder="输入电影名称..." style="${ssrRenderStyle({ "width": "80%", "padding": "15px 20px", "font-size": "18px", "border": "2px solid #e5e7eb", "border-radius": "8px", "outline": "none" })}"><button style="${ssrRenderStyle({ "margin-top": "15px", "padding": "12px 30px", "background": "#3b82f6", "color": "white", "border": "none", "border-radius": "8px", "font-size": "16px", "cursor": "pointer" })}"> 搜索 </button></div>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_MovieSkeleton, null, null, _parent));
      } else if (!unref(results)?.results || unref(results).results.length === 0) {
        _push(`<div style="${ssrRenderStyle({ "text-align": "center", "padding": "50px", "color": "#666" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px", "justify-content": "center" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: unref(keyword) ? "mdi:emoticon-sad" : "mdi:hand-pointing-up",
          size: "24"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(keyword) ? "没有找到相关电影" : "输入关键词开始搜索")}</span></div>`);
      } else {
        _push(`<div><p style="${ssrRenderStyle({ "margin-bottom": "20px", "color": "#666" })}"> 找到 ${ssrInterpolate(unref(results).total_results)} 部电影 </p><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "20px" })}"><!--[-->`);
        ssrRenderList(unref(results).results, (movie) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: movie.id,
            to: `/movie/${movie.id}`,
            style: { "text-decoration": "none", "color": "inherit" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div style="${ssrRenderStyle({ "transition": "transform 0.2s" })}"${_scopeId}>`);
                if (movie.poster_path) {
                  _push2(`<div style="${ssrRenderStyle({ "position": "relative" })}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    alt: movie.title,
                    width: "300",
                    height: "450",
                    format: "webp",
                    loading: "lazy",
                    placeholder: [50, 75, 75, 5],
                    sizes: "200px",
                    style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<div style="${ssrRenderStyle({ "width": "100%", "height": "300px", "background": "#e5e7eb", "border-radius": "8px", "display": "flex", "align-items": "center", "justify-content": "center", "color": "#9ca3af" })}"${_scopeId}> 无海报 </div>`);
                }
                _push2(`<h3 style="${ssrRenderStyle({ "margin-top": "10px", "font-weight": "600" })}"${_scopeId}>${ssrInterpolate(movie.title)}</h3><p style="${ssrRenderStyle({ "color": "#666", "font-size": "14px" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(Icon, {
                  name: "mdi:star",
                  size: "14",
                  color: "#fbbf24"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(movie.vote_average ? movie.vote_average.toFixed(1) : "N/A")} `);
                if (movie.release_date) {
                  _push2(`<span${_scopeId}>| ${ssrInterpolate(movie.release_date)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p></div>`);
              } else {
                return [
                  createVNode("div", {
                    style: { "transition": "transform 0.2s" },
                    onMouseenter: ($event) => $event.currentTarget.style.transform = "scale(1.05)",
                    onMouseleave: ($event) => $event.currentTarget.style.transform = "scale(1)"
                  }, [
                    movie.poster_path ? (openBlock(), createBlock("div", {
                      key: 0,
                      style: { "position": "relative" }
                    }, [
                      createVNode(_component_NuxtImg, {
                        src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        alt: movie.title,
                        width: "300",
                        height: "450",
                        format: "webp",
                        loading: "lazy",
                        placeholder: [50, 75, 75, 5],
                        sizes: "200px",
                        style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }
                      }, null, 8, ["src", "alt"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      style: { "width": "100%", "height": "300px", "background": "#e5e7eb", "border-radius": "8px", "display": "flex", "align-items": "center", "justify-content": "center", "color": "#9ca3af" }
                    }, " 无海报 ")),
                    createVNode("h3", { style: { "margin-top": "10px", "font-weight": "600" } }, toDisplayString(movie.title), 1),
                    createVNode("p", { style: { "color": "#666", "font-size": "14px" } }, [
                      createVNode(Icon, {
                        name: "mdi:star",
                        size: "14",
                        color: "#fbbf24"
                      }),
                      createTextVNode(" " + toDisplayString(movie.vote_average ? movie.vote_average.toFixed(1) : "N/A") + " ", 1),
                      movie.release_date ? (openBlock(), createBlock("span", { key: 0 }, "| " + toDisplayString(movie.release_date), 1)) : createCommentVNode("", true)
                    ])
                  ], 40, ["onMouseenter", "onMouseleave"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-C-36eEN5.mjs.map
