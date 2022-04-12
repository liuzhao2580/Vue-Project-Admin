import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/theme.scss' // 换肤功能
import '@/permission' // 权限验证
import '@/styles/index.scss' // 公共的样式
import 'element-ui/lib/theme-chalk/display.css' // 基于断点的隐藏类 Element 额外提供了一系列类名，用于在某些条件下隐藏元素

import '@/mock' // 导入 mock  不需要的时候注释

import './icons' // 导入 icon 字体

import '@/directives/permission'
// 打包的时候注释 不然 externals 还是会将 elementUI 打包

const app = createApp(App)

app.mount('#app')
app.use(router).use(store)
