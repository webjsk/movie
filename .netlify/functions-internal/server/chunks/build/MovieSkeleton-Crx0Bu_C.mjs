import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ style: { "display": "grid", "grid-template-columns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "20px" } }, _attrs))} data-v-fd840bcf><!--[-->`);
  ssrRenderList(10, (i) => {
    _push(`<div style="${ssrRenderStyle({ "animation": "pulse 2s infinite" })}" data-v-fd840bcf><div style="${ssrRenderStyle({ "width": "100%", "height": "300px", "background": "#e5e7eb", "border-radius": "8px" })}" data-v-fd840bcf>11</div><div style="${ssrRenderStyle({ "margin-top": "10px", "height": "20px", "background": "#e5e7eb", "border-radius": "4px", "width": "80%" })}" data-v-fd840bcf></div><div style="${ssrRenderStyle({ "margin-top": "8px", "height": "16px", "background": "#e5e7eb", "border-radius": "4px", "width": "60%" })}" data-v-fd840bcf></div></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovieSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fd840bcf"]]), { __name: "MovieSkeleton" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=MovieSkeleton-Crx0Bu_C.mjs.map
