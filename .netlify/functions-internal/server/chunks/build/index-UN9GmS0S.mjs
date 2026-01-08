import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { _ as __nuxt_component_1 } from './MovieSkeleton-Crx0Bu_C.mjs';
import { _ as __nuxt_component_1$1 } from './NuxtImg-D_HxLKuI.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useAuthStore, b as useRouter, u as useSeoMeta, I as Icon } from './server.mjs';
import { storeToRefs } from 'pinia';
import { G as GetMovieList } from './movie-WB1Mrw7Q.mjs';
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
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const { user, isLoggedIn, isAdmin } = storeToRefs(authStore);
    const { logout } = authStore;
    useRouter();
    const page = ref(1);
    const {
      data: movies,
      pending,
      error
    } = GetMovieList(page);
    useSeoMeta({
      title: "热门电影",
      description: "浏览最新最热门的电影"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MovieSkeleton = __nuxt_component_1;
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "max-width": "1200px", "margin": "0 auto", "padding": "20px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "20px" })}"><h1 style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "bold", "display": "flex", "align-items": "center", "gap": "8px" })}">`);
      _push(ssrRenderComponent(Icon, {
        name: "mdi:movie",
        size: "32"
      }, null, _parent));
      _push(` 热门电影 </h1><div style="${ssrRenderStyle({ "display": "flex", "gap": "15px", "align-items": "center" })}">`);
      if (unref(isLoggedIn)) {
        _push(`<!--[--><span style="${ssrRenderStyle({ "color": "#666", "display": "flex", "align-items": "center", "gap": "4px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:account",
          size: "16"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(user)?.username)} `);
        if (unref(isAdmin)) {
          _push(`<span style="${ssrRenderStyle({ "background": "#f59e0b", "color": "white", "padding": "2px 8px", "border-radius": "4px", "font-size": "12px", "margin-left": "5px" })}"> 管理员 </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
        if (unref(isAdmin)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin",
            style: { "padding": "10px 20px", "background": "#8b5cf6", "color": "white", "text-decoration": "none", "border-radius": "8px" }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(Icon, {
                  name: "mdi:crown",
                  size: "18"
                }, null, _parent2, _scopeId));
                _push2(` 管理后台 `);
              } else {
                return [
                  createVNode(Icon, {
                    name: "mdi:crown",
                    size: "18"
                  }),
                  createTextVNode(" 管理后台 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/ratings",
          style: { "padding": "10px 20px", "background": "#f59e0b", "color": "white", "text-decoration": "none", "border-radius": "8px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(Icon, {
                name: "mdi:star",
                size: "18",
                color: "white"
              }, null, _parent2, _scopeId));
              _push2(` 我的评分 `);
            } else {
              return [
                createVNode(Icon, {
                  name: "mdi:star",
                  size: "18",
                  color: "white"
                }),
                createTextVNode(" 我的评分 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/favorites",
          style: { "padding": "10px 20px", "background": "#ef4444", "color": "white", "text-decoration": "none", "border-radius": "8px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(Icon, {
                name: "mdi:heart",
                size: "18",
                color: "white"
              }, null, _parent2, _scopeId));
              _push2(` 我的收藏 `);
            } else {
              return [
                createVNode(Icon, {
                  name: "mdi:heart",
                  size: "18",
                  color: "white"
                }),
                createTextVNode(" 我的收藏 ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button style="${ssrRenderStyle({ "padding": "10px 20px", "background": "#6b7280", "color": "white", "border": "none", "border-radius": "8px", "cursor": "pointer" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:logout",
          size: "18",
          color: "white"
        }, null, _parent));
        _push(` 登出 </button><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          style: { "padding": "10px 20px", "background": "#10b981", "color": "white", "text-decoration": "none", "border-radius": "8px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(Icon, {
                name: "mdi:lock",
                size: "18",
                color: "white"
              }, null, _parent2, _scopeId));
              _push2(` 登录 `);
            } else {
              return [
                createVNode(Icon, {
                  name: "mdi:lock",
                  size: "18",
                  color: "white"
                }),
                createTextVNode(" 登录 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        style: { "padding": "10px 20px", "background": "#3b82f6", "color": "white", "text-decoration": "none", "border-radius": "8px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:magnify",
              size: "18",
              color: "white"
            }, null, _parent2, _scopeId));
            _push2(` 搜索电影 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:magnify",
                size: "18",
                color: "white"
              }),
              createTextVNode(" 搜索电影 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div style="${ssrRenderStyle({ "display": "flex", "gap": "10px", "flex-wrap": "wrap", "margin-bottom": "30px", "padding-bottom": "20px", "border-bottom": "1px solid #e5e7eb" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/action",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px", "transition": "all 0.2s" },
        onMouseenter: ($event) => $event.target.style.background = "#e5e7eb",
        onMouseleave: ($event) => $event.target.style.background = "#f3f4f6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:movie-open",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 动作 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:movie-open",
                size: "16"
              }),
              createTextVNode(" 动作 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/comedy",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:emoticon-happy",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 喜剧 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:emoticon-happy",
                size: "16"
              }),
              createTextVNode(" 喜剧 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/drama",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:drama-masks",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 剧情 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:drama-masks",
                size: "16"
              }),
              createTextVNode(" 剧情 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/horror",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:ghost",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 恐怖 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:ghost",
                size: "16"
              }),
              createTextVNode(" 恐怖 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/romance",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:heart",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 爱情 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:heart",
                size: "16"
              }),
              createTextVNode(" 爱情 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/scifi",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:rocket-launch",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 科幻 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:rocket-launch",
                size: "16"
              }),
              createTextVNode(" 科幻 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/thriller",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:emoticon-frown",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 惊悚 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:emoticon-frown",
                size: "16"
              }),
              createTextVNode(" 惊悚 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category/animation",
        style: { "padding": "8px 16px", "background": "#f3f4f6", "color": "#374151", "text-decoration": "none", "border-radius": "20px", "font-size": "14px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Icon, {
              name: "mdi:palette",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(` 动画 `);
          } else {
            return [
              createVNode(Icon, {
                name: "mdi:palette",
                size: "16"
              }),
              createTextVNode(" 动画 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "20px", "color": "#666" })}"> 第 ${ssrInterpolate(unref(page))} 页 / 共 ${ssrInterpolate(unref(movies)?.total_pages || 0)} 页 （总共 ${ssrInterpolate(unref(movies)?.total_results || 0)} 部电影） </div>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_MovieSkeleton, null, null, _parent));
      } else if (unref(error)) {
        _push(`<div style="${ssrRenderStyle({ "color": "red", "padding": "20px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "8px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:close-circle",
          size: "20",
          color: "#ef4444"
        }, null, _parent));
        _push(` 错误: ${ssrInterpolate(unref(error).message)}</span></div>`);
      } else {
        _push(`<div><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "20px" })}"><!--[-->`);
        ssrRenderList(unref(movies)?.results, (movie, index) => {
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
                  loading: index < 4 ? "eager" : "lazy",
                  fetchpriority: index === 0 ? "high" : "auto",
                  placeholder: [50, 75, 75, 5],
                  style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }
                }, null, _parent2, _scopeId));
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
                    createVNode(_component_NuxtImg, {
                      src: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                      alt: movie.title,
                      width: "300",
                      height: "450",
                      format: "webp",
                      loading: index < 4 ? "eager" : "lazy",
                      fetchpriority: index === 0 ? "high" : "auto",
                      placeholder: [50, 75, 75, 5],
                      style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)" }
                    }, null, 8, ["src", "alt", "loading", "fetchpriority"]),
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
          color: "white",
          opacity: unref(page) === 1 ? 0.5 : 1
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
          color: "white",
          opacity: unref(page) >= (unref(movies)?.total_pages || 1) ? 0.5 : 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-UN9GmS0S.mjs.map
