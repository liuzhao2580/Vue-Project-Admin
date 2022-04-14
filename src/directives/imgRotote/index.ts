// 注册一个全局自定义指令 `v-image-rotote` 用于设置图片旋转
import { createApp } from 'vue'

// eslint-disable-next-line vue/require-name-property
const app = createApp({})

const directive_img = {
  beforeMount(el: any) {
    el.onmouseover = () => {
      el.style.transform = 'rotate(-360deg)'
      el.style.transition = 'all 0.5s'
    }
    el.onmouseleave = () => {
      el.style.transform = 'rotate(0)'
    }
  }
}
app.directive('image-rotote', directive_img)

export default directive_img
