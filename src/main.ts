import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 基于断点的隐藏类 Element 额外提供了一系列类名，用于在某些条件下隐藏元素
import App from './App.vue'
import router from './router'
import mockXHR from '@/mock'
import '@/permission' // 权限验证
import '@/styles/index.scss' // 公共的样式
// import './icons' // 导入 icon 字体
import globalComponent from '@/components/index'
/** 注册全局的 自定义指令 */
import globalDirectives from '@/directives'
import 'virtual:svg-icons-register'

mockXHR() // 导入 mock

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(ElementPlus).use(pinia).mount('#app')

globalDirectives(app)

// 注册全局的组件
for (const componentItme in globalComponent) {
  app.component(componentItme, globalComponent[componentItme])
}

if (import.meta.env.VITE_ENV !== 'development') {
  console.log = function () {}
}
