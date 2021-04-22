import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"

import "@/styles/theme.scss" // 换肤功能
import "@/permission" // 权限验证
import "@/styles/index.scss" // 公共的样式
import "element-ui/lib/theme-chalk/display.css" // 基于断点的隐藏类 Element 额外提供了一系列类名，用于在某些条件下隐藏元素

import "@/mock" // 导入 mock  不需要的时候注释

import "./icons" // 导入 icon 字体

import "@/directives/permission"
// 打包的时候注释 不然 externals 还是会将 elementUI 打包
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
