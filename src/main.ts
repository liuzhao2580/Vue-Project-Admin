import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 基于断点的隐藏类 Element 额外提供了一系列类名，用于在某些条件下隐藏元素
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import mockXHR from '@/mock/index'

import '@/styles/theme.scss' // 换肤功能
// import '@/permission' // 权限验证
import '@/styles/index.scss' // 公共的样式

import './icons' // 导入 icon 字体

import '@/directives/permission'

mockXHR() // 导入 mock

const app = createApp(App)

app.use(store, key).use(router).use(ElementPlus).mount('#app')
