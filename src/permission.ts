import router from '@/router'
import Nprogress from 'nprogress'
import { getCookie } from '@/utils/cookies'
import 'nprogress/nprogress.css' // 必须要的样式
import setPageTitle from '@/utils/setPageTitle'
import store from '@/store'

router.beforeEach(async (to: any | string, from: any, next: any) => {
  const token = getCookie('token')
  // 用于设置 浏览器的 title 显示
  document.title = setPageTitle(to.meta.title)
  Nprogress.start()
  // 说明存在 token 用于已经登录
  if (token) {
    /**
     * 如果在 token 存在的情况下要跳转到登录页面的话，阻止跳转
     * 在退出登录的时候会清除 token
     */
    const Need_refresh = store.getters['user/Need_refresh']
    if (to.path === '/login') {
      next(false)
      Nprogress.done()
      return
    }
    /**
     * 说明是正常的路由页面
     * 判断是否刷新页面 false 否 true 是
     * 刷新页面重新请求用户数据
     */
    if (Need_refresh) {
      try {
        const routesList = await store.dispatch('user/ACT_findByIDUser')
        router.addRoutes(routesList)
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        Nprogress.done()
      } catch (error) {
        console.log(error)
      }
    } else {
      next(true)
      Nprogress.done()
    }
  } else {
    if (to.path === '/login') {
      next(true)
    } else {
      next({
        path: '/login'
      })
    }
    Nprogress.done()
  }
})
router.afterEach(() => {
  Nprogress.done()
})
