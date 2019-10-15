import router from "@/router"
import Nprogress from "nprogress"
import "nprogress/nprogress.css" // 必须要的样式
router.beforeEach((to, from, next) => {
    Nprogress.start()
    next()
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    Nprogress.done()
})