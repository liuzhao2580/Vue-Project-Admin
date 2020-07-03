// 注册一个全局自定义指令 `v-image-rotote` 用于设置图片旋转
import Vue from 'vue'
const directive_img =  {
    bind(el) {
        el.onmouseover = () => {
            el.style.transform = 'rotate(-360deg)'
            el.style.transition = 'all 0.5s'
        }
        el.onmouseleave = () => {
            el.style.transform = 'rotate(0)'
        }
    }
}
Vue.directive('image-rotote', directive_img)

export default directive_img
