import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
// 设置 elementUI 的按需导入
// import './ElementImport'
// 换肤功能
import '@/styles/theme.scss'
import "@/permission"   // 权限验证
import "@/styles/index.scss" // 公共的样式

import '@/mock' // 导入 mock  不需要的时候注释

import "./icons"  // 导入 icon 字体

// 打包的时候注释 不然 externals 还是会将 elementUI 打包
Vue.use(ElementUI) 
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app")
