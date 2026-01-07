import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { _ as __nuxt_component_1 } from './NuxtImg-D_HxLKuI.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { d as useRatingsStore, u as useSeoMeta, I as Icon } from './server.mjs';
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
  __name: "ratings",
  __ssrInlineRender: true,
  setup(__props) {
    const ratingsStore = useRatingsStore();
    const ratedMovieIds = computed(() => Object.keys(ratingsStore.ratings).map(Number));
    const movies = ref([]);
    const loading = ref(true);
    useSeoMeta({
      title: "我的评分",
      description: "我评分过的电影"
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
      _push(`<h1 style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "bold", "margin-bottom": "30px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:star",
        size: "32",
        color: "#f59e0b"
      }, null, _parent));
      _push(` 我的评分 (${ssrInterpolate(unref(ratedMovieIds).length)}) </span></h1>`);
      if (unref(loading)) {
        _push(`<div style="${ssrRenderStyle({ "text-align": "center", "padding": "50px" })}"> 加载中... </div>`);
      } else if (unref(ratedMovieIds).length === 0) {
        _push(`<div style="${ssrRenderStyle({ "text-align": "center", "padding": "100px 20px", "color": "#666" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:star-outline",
          size: "48",
          color: "#f59e0b"
        }, null, _parent));
        _push(`<p style="${ssrRenderStyle({ "font-size": "18px" })}">还没有评分任何电影</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          style: { "display": "inline-block", "margin-top": "20px", "padding": "10px 20px", "background": "#3b82f6", "color": "white", "text-decoration": "none", "border-radius": "8px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 去评分 `);
            } else {
              return [
                createTextVNode(" 去评分 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "20px" })}"><!--[-->`);
        ssrRenderList(unref(movies), (movie) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: movie.id,
            to: `/movie/${movie.id}`,
            style: { "text-decoration": "none", "color": "inherit" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div style="${ssrRenderStyle({ "transition": "transform 0.2s" })}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                  alt: movie.title,
                  width: "300",
                  height: "450",
                  format: "webp",
                  loading: "lazy",
                  placeholder: [50, 75, 75, 5],
                  style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }
                }, null, _parent2, _scopeId));
                _push2(`<h3 style="${ssrRenderStyle({ "margin-top": "10px", "font-weight": "600" })}"${_scopeId}>${ssrInterpolate(movie.title)}</h3><p style="${ssrRenderStyle({ "color": "#666", "font-size": "14px" })}"${_scopeId}><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px" })}"${_scopeId}> 我的评分: `);
                _push2(ssrRenderComponent(Icon, {
                  name: "mdi:star",
                  size: "14",
                  color: "#f59e0b"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(unref(ratingsStore).ratings[movie.id]?.toFixed(1) || "0.0")}</span></p><p style="${ssrRenderStyle({ "color": "#999", "font-size": "12px" })}"${_scopeId}> TMDB: ${ssrInterpolate(movie.vote_average.toFixed(1))}</p></div>`);
              } else {
                return [
                  createVNode("div", {
                    style: { "transition": "transform 0.2s" },
                    onMouseenter: ($event) => $event.currentTarget.style.transform = "scale(1.05)",
                    onMouseleave: ($event) => $event.currentTarget.style.transform = "scale(1)"
                  }, [
                    createVNode(_component_NuxtImg, {
                      src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                      alt: movie.title,
                      width: "300",
                      height: "450",
                      format: "webp",
                      loading: "lazy",
                      placeholder: [50, 75, 75, 5],
                      style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }
                    }, null, 8, ["src", "alt"]),
                    createVNode("h3", { style: { "margin-top": "10px", "font-weight": "600" } }, toDisplayString(movie.title), 1),
                    createVNode("p", { style: { "color": "#666", "font-size": "14px" } }, [
                      createVNode("span", { style: { "display": "flex", "align-items": "center", "gap": "4px" } }, [
                        createTextVNode(" 我的评分: "),
                        createVNode(Icon, {
                          name: "mdi:star",
                          size: "14",
                          color: "#f59e0b"
                        }),
                        createTextVNode(" " + toDisplayString(unref(ratingsStore).ratings[movie.id]?.toFixed(1) || "0.0"), 1)
                      ])
                    ]),
                    createVNode("p", { style: { "color": "#999", "font-size": "12px" } }, " TMDB: " + toDisplayString(movie.vote_average.toFixed(1)), 1)
                  ], 40, ["onMouseenter", "onMouseleave"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ratings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ratings-MlLWLv8d.mjs.map
