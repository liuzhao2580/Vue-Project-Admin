import { RouteRecordRaw } from "vue-router";
import PageContent from "@/layout/components/AppMain.vue";
import { RouterName, RouterPath } from "../RouteConst";
const components: RouteRecordRaw = {
  path: RouterPath.COMPONENTS,
  meta: { title: "组件", icon: "components" },
  redirect: RouterPath.RICHTEXT,
  component: PageContent,
  name: "components",
  children: [
    {
      path: RouterPath.RICHTEXT,
      meta: { title: "富文本", icon: "richtext" },
      name: RouterName.RICHTEXT,
      component: () =>
        import(
          /* webpackChunkName: "richtextComponents" */ "@/views/components/richtext/index.vue"
        )
    },
    {
      path: RouterPath.MARKDOWN,
      meta: { title: "Markdown", icon: "markdown" },
      name: RouterName.MARKDOWN,
      component: () =>
        import(
          /* webpackChunkName: "markdownComponents" */ "@/views/components/markdown/index.vue"
        )
    },
    {
      path: RouterPath.DRAG_DIALOG,
      meta: { title: "可拖拽Dialog", icon: "dialog" },
      name: RouterName.DRAG_DIALOG,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/drag-dialog/index.vue"
        )
    },
    {
      path: RouterPath.BACK_TO_TOP,
      meta: { title: "返回顶部", icon: "backtop" },
      name: RouterName.BACK_TO_TOP,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/back-to-top/index.vue"
        )
    },
    {
      path: RouterPath.ELEMENT,
      meta: { title: "element", icon: "element" },
      name: RouterName.ELEMENT,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/element/index.vue"
        )
    },
    {
      path: RouterPath.TOPOLOGY,
      meta: { title: "拓扑图", icon: "topology" },
      name: RouterName.TOPOLOGY,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/topology/index.vue"
        )
    },
    {
      path: RouterPath.BPMN,
      meta: { title: "Bpmn", icon: "bpmn" },
      name: RouterName.BPMN,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/bpmn/index.vue"
        )
    },
    {
      path: RouterPath.AUDIO_VIDEO,
      meta: { title: "音视频", icon: "audio-video" },
      name: RouterName.AUDIO_VIDEO,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/audio-video/index.vue"
        )
    },
    {
      path: RouterPath.EMOJI_INPUT,
      meta: { title: "EMOJI", icon: "EMOJI" },
      name: RouterName.EMOJI_INPUT,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/emoji/index.vue"
        )
    },
    {
      path: RouterPath.OTHER_COMPONENTS,
      meta: { title: "其他组件", icon: "other-components" },
      name: RouterName.OTHER_COMPONENTS,
      component: () =>
        import(
          /* webpackChunkName: "componentsPage" */ "@/views/components/other-components/index.vue"
        )
    }
  ]
};

export default components;
