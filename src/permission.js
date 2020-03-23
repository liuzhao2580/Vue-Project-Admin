import router from "@/router"
import Nprogress from "nprogress"
import { getCookie } from '@/utils/cookies'
import "nprogress/nprogress.css" // 必须要的样式
import setPageTitle from "@/utils/setPageTitle"

router.beforeEach((to, from, next) => {
    const token = getCookie("token")
    // 用于设置 浏览器的 title 显示
    document.title = setPageTitle(to.meta.title)
    Nprogress.start()
    // 说明存在 token 用于已经登录
    if (token) {
        /**
         * 如果在 token 存在的情况下要跳转到登录页面的话，阻止跳转
         * 在退出登录的时候会清除 token 
         */
        if(to.path === "/login") {
            next(false)
            Nprogress.done()
            return
        }
        next()
        Nprogress.done()
    }
    else {
        if (to.path === "/login") {
            next()
        }
        else {
            next({
                path: "/login"
            })
        }
        Nprogress.done()
    }
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    Nprogress.done()
})