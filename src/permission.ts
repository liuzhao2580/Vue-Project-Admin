import { RouteLocationNormalized } from "vue-router"
import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/es/components/loading/src/loading"
import Nprogress from "nprogress"
import "nprogress/nprogress.css" // 必须要的样式
import router from "@/router"
import { getCookie, CONST_VARIABLE } from "@/utils/modules/cookies"
import setPageTitle from "@/utils/modules/setPageTitle"
import { useUserStore } from "@/store/user"
import { RouterPath } from "./router/RouteConst"

let loadingInstance: LoadingInstance
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: Function
  ) => {
    const userStore = useUserStore()
    const token = getCookie(CONST_VARIABLE.TOKEN)
    // 用于设置 浏览器的 title 显示
    document.title = setPageTitle(to.meta.title)
    Nprogress.start()
    // 说明存在 token 用于已经登录
    if (token) {
      loadingInstance = ElLoading.service({ fullscreen: true })
      /**
       * 如果在 token 存在的情况下要跳转到登录页面的话，阻止跳转
       * 在退出登录的时候会清除 token
       */
      const Need_refresh = userStore.state.Need_refresh
      if (to.path === RouterPath.LOGIN) return false
      /**
       * 说明是正常的路由页面
       * 判断是否刷新页面 false 否 true 是
       * 刷新页面重新请求用户数据
       */
      if (Need_refresh) {
        try {
          await userStore.findUserInfoByID()
          next(to)
        } catch (error) {
          console.log(error)
        }
      } else {
        // 外链路由, 从新标签打开，返回上一个路由
        if (to.meta.outsideUrl) {
          window.open(to.meta.outsideUrl)
          next({ path: from.fullPath, replace: true, query: from.query })
          return
        }
        next()
      }
    } else {
      if (to.path === RouterPath.LOGIN) {
        next()
      } else {
        next({
          path: RouterPath.LOGIN
        })
      }
    }
  }
)
router.afterEach(() => {
  if (loadingInstance) loadingInstance.close()
  Nprogress.done()
})
