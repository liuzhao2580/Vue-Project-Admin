import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
// 换肤功能
import '@/styles/theme.scss'
import "@/permission"   // 权限验证
import "@/styles/index.scss" // 公共的样式

import '@/mock' // 导入 mock  不需要的时候注释

import "./icons"  // 导入 icon 字体


// 在生成环境的时候使用 externals 不能存在 Vue.use(ElementUI)
if(process.env.NODE_ENV === 'development') Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app")
