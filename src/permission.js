import router from "@/router"
import Nprogress from "nprogress"
import "nprogress/nprogress.css" // 必须要的样式
import setPageTitle from "@/utils/setPageTitle"
router.beforeEach((to, from, next) => {
    Nprogress.start()
    // 用于设置 浏览器的 title 显示
    document.title = setPageTitle(to.meta.title)
    next()
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    Nprogress.done()
})