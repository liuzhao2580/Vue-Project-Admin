import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'
const { body } = document
// 设置一个宽度的大小, 用来判断当前的侧边栏展开折叠
const WIDTH = 992

@Component({})
export default class LayoutMixin extends Vue {
  beforeMount(): void {
    // 页面进来的时候监听 屏幕的变化  调用方法
    window.addEventListener('resize', this.$_ResizeScreen)
  }
  beforeDestroy() {
    // 页面销毁的时候移除监听 屏幕的变化  调用方法
    window.removeEventListener('resize', this.$_ResizeScreen)
  }
  created(): void {
    this.$_ResizeScreen()
  }
  $_isMobile() {
    const react = body.getBoundingClientRect()
    if (react.width < 768) store.dispatch('app/Act_setDevice', true)
    else store.dispatch('app/Act_setDevice', false)
    return react.width - 1 < WIDTH
  }
  $_ResizeScreen(): void {
    const side_flag = this.$_isMobile()
    if (side_flag) {
      store.dispatch('app/Act_flodSide')
    } else if (!side_flag) {
      store.dispatch('app/ACT_unflodSide')
    }
  }
}
