import router from "@/router"
import Nprogress from "nprogress"
import { getCookie } from '@/utils/cookies'
import "nprogress/nprogress.css" // 必须要的样式
import setPageTitle from "@/utils/setPageTitle"

const token = getCookie("token")
console.log(token)
router.beforeEach((to, from, next) => {
    // 用于设置 浏览器的 title 显示
    document.title = setPageTitle(to.meta.title)
    Nprogress.start()
    // next()
    // 说明存在 token 用于已经登录
    if (token) {
        // if (to.path === "/login") {
        //     next(false)
        // }
        // else {
        //     next()
        //     Nprogress.start()
        // }
        next()
        Nprogress.done()
    }
    // else {
    //     if (to.path === "/login") {
    //         next()
    //         Nprogress.start()
    //     }
    //     else {
    //         next({
    //             path: "/login"
    //         })
    //         Nprogress.start()
    //     }
    // }
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    Nprogress.done()
})