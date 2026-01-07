import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { _ as __nuxt_component_1 } from './NuxtImg-D_HxLKuI.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createVNode, createTextVNode, unref, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as GetMovieListByCategory } from './movie-D9X_Omhe.mjs';
import { c as useRoute, f as createError, u as useSeoMeta, I as Icon } from './server.mjs';
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
  __name: "[type]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const categoryId = route.params.type;
    const categories = {
      "action": { id: 28, name: "动作" },
      "comedy": { id: 35, name: "喜剧" },
      "drama": { id: 18, name: "剧情" },
      "horror": { id: 27, name: "恐怖" },
      "romance": { id: 10749, name: "爱情" },
      "scifi": { id: 878, name: "科幻" },
      "thriller": { id: 53, name: "惊悚" },
      "animation": { id: 16, name: "动画" }
    };
    const category = categories[categoryId];
    if (!category) {
      throw createError({
        statusCode: 404,
        message: "分类不存在"
      });
    }
    const page = ref(1);
    const { data: movies, pending, error } = ([__temp, __restore] = withAsyncContext(() => GetMovieListByCategory(category.id, page)), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: `${category.name}电影`,
      description: `浏览热门${category.name}电影`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_1;
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
      _push(`<h1 style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "bold", "margin-bottom": "30px" })}">${ssrInterpolate(unref(category).name)}电影 </h1>`);
      if (unref(pending)) {
        _push(`<div style="${ssrRenderStyle({ "text-align": "center", "padding": "50px" })}"> 加载中... </div>`);
      } else if (unref(error)) {
        _push(`<div style="${ssrRenderStyle({ "color": "red", "padding": "20px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:close-circle",
          size: "20",
          color: "#ef4444"
        }, null, _parent));
        _push(` 错误: ${ssrInterpolate(unref(error).message)}</span></div>`);
      } else {
        _push(`<div><div style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "20px", "color": "#666" })}"> 第 ${ssrInterpolate(unref(page))} 页 / 共 ${ssrInterpolate(unref(movies)?.total_pages || 0)} 页 </div><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "20px" })}"><!--[-->`);
        ssrRenderList(unref(movies)?.results, (movie) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: movie.id,
            to: `/movie/${movie.id}`,
            style: { "text-decoration": "none", "color": "inherit" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div style="${ssrRenderStyle({ "transition": "transform 0.2s" })}"${_scopeId}>`);
                if (movie.poster_path) {
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                    alt: movie.title,
                    width: "300",
                    height: "450",
                    format: "webp",
                    loading: "lazy",
                    style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0,0,0,0.1)" }
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<div style="${ssrRenderStyle({ "width": "100%", "height": "300px", "background": "#e5e7eb", "border-radius": "8px", "display": "flex", "align-items": "center", "justify-content": "center" })}"${_scopeId}> 无海报 </div>`);
                }
                _push2(`<h3 style="${ssrRenderStyle({ "margin-top": "10px", "font-weight": "600" })}"${_scopeId}>${ssrInterpolate(movie.title)}</h3><p style="${ssrRenderStyle({ "color": "#666", "font-size": "14px" })}"${_scopeId}><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(Icon, {
                  name: "mdi:star",
                  size: "14",
                  color: "#fbbf24"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(movie.vote_average.toFixed(1))} | ${ssrInterpolate(movie.release_date)}</span></p></div>`);
              } else {
                return [
                  createVNode("div", {
                    style: { "transition": "transform 0.2s" },
                    onMouseenter: ($event) => $event.currentTarget.style.transform = "scale(1.05)",
                    onMouseleave: ($event) => $event.currentTarget.style.transform = "scale(1)"
                  }, [
                    movie.poster_path ? (openBlock(), createBlock(_component_NuxtImg, {
                      key: 0,
                      src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                      alt: movie.title,
                      width: "300",
                      height: "450",
                      format: "webp",
                      loading: "lazy",
                      style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0,0,0,0.1)" }
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      style: { "width": "100%", "height": "300px", "background": "#e5e7eb", "border-radius": "8px", "display": "flex", "align-items": "center", "justify-content": "center" }
                    }, " 无海报 ")),
                    createVNode("h3", { style: { "margin-top": "10px", "font-weight": "600" } }, toDisplayString(movie.title), 1),
                    createVNode("p", { style: { "color": "#666", "font-size": "14px" } }, [
                      createVNode("span", { style: { "display": "flex", "align-items": "center", "gap": "4px" } }, [
                        createVNode(Icon, {
                          name: "mdi:star",
                          size: "14",
                          color: "#fbbf24"
                        }),
                        createTextVNode(" " + toDisplayString(movie.vote_average.toFixed(1)) + " | " + toDisplayString(movie.release_date), 1)
                      ])
                    ])
                  ], 40, ["onMouseenter", "onMouseleave"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "center", "align-items": "center", "gap": "20px", "margin-top": "40px" })}"><button${ssrIncludeBooleanAttr(unref(page) === 1) ? " disabled" : ""} style="${ssrRenderStyle({
          padding: "12px 24px",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: unref(page) === 1 ? "not-allowed" : "pointer",
          background: unref(page) === 1 ? "#d1d5db" : "#3b82f6",
          color: "white"
        })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:chevron-left",
          size: "20",
          color: "white"
        }, null, _parent));
        _push(` 上一页 </button><span style="${ssrRenderStyle({ "color": "#666", "font-weight": "600" })}">${ssrInterpolate(unref(page))} / ${ssrInterpolate(unref(movies)?.total_pages)}</span><button${ssrIncludeBooleanAttr(unref(page) >= (unref(movies)?.total_pages || 1)) ? " disabled" : ""} style="${ssrRenderStyle({
          padding: "12px 24px",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          cursor: unref(page) >= (unref(movies)?.total_pages || 1) ? "not-allowed" : "pointer",
          background: unref(page) >= (unref(movies)?.total_pages || 1) ? "#d1d5db" : "#3b82f6",
          color: "white"
        })}"> 下一页 `);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:chevron-right",
          size: "20",
          color: "white"
        }, null, _parent));
        _push(`</button></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category/[type].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_type_-CwZfkwFi.mjs.map
