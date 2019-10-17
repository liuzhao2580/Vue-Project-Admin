import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
import "@/permission"   // 权限验证
import "@/styles/index.scss" // 公共的样式

import '@/mock' // 导入 mock  不需要的时候注释

import "./Icon"  // 道路 icon 字体
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app")
