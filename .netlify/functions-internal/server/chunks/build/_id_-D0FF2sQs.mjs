import { _ as __nuxt_component_0 } from './nuxt-link-vDfCgmUc.mjs';
import { _ as __nuxt_component_1 } from './NuxtImg-D_HxLKuI.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, createVNode, createTextVNode, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { c as useRoute, d as useRatingsStore, e as useFavoritesStore, u as useSeoMeta, I as Icon } from './server.mjs';
import { a as GetMovieDetail } from './movie-WB1Mrw7Q.mjs';
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
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StarRating",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    movieId: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    useRatingsStore();
    const hoveredStar = ref(0);
    const displayRating = computed(() => Math.round(props.modelValue / 2));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "flex", "align-items": "center", "gap": "8px" } }, _attrs))}><div style="${ssrRenderStyle({ "display": "flex", "gap": "4px" })}"><!--[-->`);
      ssrRenderList(5, (star) => {
        _push(`<span style="${ssrRenderStyle({
          fontSize: "24px",
          cursor: "pointer",
          transition: "transform 0.2s",
          transform: unref(hoveredStar) === star ? "scale(1.2)" : "scale(1)"
        })}">`);
        _push(ssrRenderComponent(Icon, {
          name: unref(hoveredStar) >= star || unref(displayRating) >= star ? "mdi:star" : "mdi:star-outline",
          size: "24",
          color: unref(hoveredStar) >= star || unref(displayRating) >= star ? "#fbbf24" : "#d1d5db"
        }, null, _parent));
        _push(`</span>`);
      });
      _push(`<!--]--></div><span style="${ssrRenderStyle({ "color": "#666", "font-size": "14px" })}">${ssrInterpolate(__props.modelValue > 0 ? `${__props.modelValue.toFixed(1)} 分` : "点击评分")}</span></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StarRating.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "StarRating" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const ratingsStore = useRatingsStore();
    const favoritesStore = useFavoritesStore();
    const movieId = route.params.id;
    const { data: movie, pending, error } = ([__temp, __restore] = withAsyncContext(() => GetMovieDetail(movieId)), __temp = await __temp, __restore(), __temp);
    const isFavorited = computed(() => favoritesStore.isFavorite(Number(movieId)));
    const userRating = ref(ratingsStore.getRating(Number(movieId)));
    useSeoMeta({
      title: () => `${movie.value?.title} - 电影详情`,
      description: () => movie.value?.overview
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_1;
      const _component_StarRating = __nuxt_component_2;
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
      } else if (unref(movie)) {
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "gap": "40px", "flex-wrap": "wrap" })}"><div style="${ssrRenderStyle({ "flex": "0 0 300px" })}">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: `https://image.tmdb.org/t/p/w500${unref(movie).poster_path}`,
          alt: unref(movie).title,
          width: "300",
          height: "450",
          format: "webp",
          placeholder: [50, 75, 75, 5],
          sizes: "200px",
          style: { "width": "100%", "border-radius": "8px", "box-shadow": "0 10px 25px rgba(0, 0, 0, 0.2)" }
        }, null, _parent));
        _push(`</div><div style="${ssrRenderStyle({ "flex": "1", "min-width": "300px" })}"><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "start", "margin-bottom": "20px" })}"><h1 style="${ssrRenderStyle({ "font-size": "48px", "font-weight": "bold", "flex": "1" })}">${ssrInterpolate(unref(movie).title)}</h1><button style="${ssrRenderStyle({
          padding: "12px 24px",
          fontSize: "18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          background: unref(isFavorited) ? "#ef4444" : "#3b82f6",
          color: "white",
          transition: "all 0.2s"
        })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "6px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: unref(isFavorited) ? "mdi:heart" : "mdi:heart-outline",
          size: "18",
          color: "white"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(isFavorited) ? "已收藏" : "收藏")}</span></button></div><div style="${ssrRenderStyle({ "display": "flex", "gap": "20px", "margin-bottom": "20px", "font-size": "18px" })}"><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:star",
          size: "18",
          color: "#fbbf24"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(movie).vote_average.toFixed(1))} 分 (TMDB) </span><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:calendar",
          size: "18"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(movie).release_date)}</span><span style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "4px" })}">`);
        _push(ssrRenderComponent(Icon, {
          name: "mdi:clock-outline",
          size: "18"
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(movie).runtime)} 分钟 </span></div><div style="${ssrRenderStyle({ "background": "#f9fafb", "padding": "20px", "border-radius": "8px", "margin-bottom": "30px" })}"><h3 style="${ssrRenderStyle({ "font-size": "18px", "font-weight": "600", "margin-bottom": "15px" })}"> 我的评分 </h3>`);
        _push(ssrRenderComponent(_component_StarRating, {
          modelValue: unref(userRating),
          "onUpdate:modelValue": ($event) => isRef(userRating) ? userRating.value = $event : null,
          "movie-id": Number(unref(movieId))
        }, null, _parent));
        _push(`</div><div style="${ssrRenderStyle({ "margin-bottom": "30px" })}"><!--[-->`);
        ssrRenderList(unref(movie).genres, (genre) => {
          _push(`<span style="${ssrRenderStyle({ "display": "inline-block", "background": "#3b82f6", "color": "white", "padding": "5px 15px", "border-radius": "20px", "margin-right": "10px", "margin-bottom": "10px" })}">${ssrInterpolate(genre.name)}</span>`);
        });
        _push(`<!--]--></div><h2 style="${ssrRenderStyle({ "font-size": "24px", "font-weight": "bold", "margin-bottom": "15px" })}"> 剧情简介 </h2><p style="${ssrRenderStyle({ "line-height": "1.8", "color": "#333", "font-size": "16px" })}">${ssrInterpolate(unref(movie).overview || "暂无简介")}</p><div style="${ssrRenderStyle({ "margin-top": "30px", "padding": "20px", "background": "#f3f4f6", "border-radius": "8px" })}"><p style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><strong>原始标题:</strong> ${ssrInterpolate(unref(movie).original_title)}</p><p style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><strong>制作国家:</strong> ${ssrInterpolate(unref(movie).production_countries?.map((c) => c.name).join(", "))}</p><p><strong>票房:</strong> $${ssrInterpolate(unref(movie).revenue?.toLocaleString() || "未知")}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movie/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-D0FF2sQs.mjs.map
