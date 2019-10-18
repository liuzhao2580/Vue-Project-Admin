import Vue from "vue"
import Router from "vue-router"
import Layout from '@/layout'

Vue.use(Router)
// 公共的页面
export const constantRoutes = [
    {
        path: "/login",
        name: "login",
        hidden: true,
        component: () => import("@/views/login")
    },
    // 首页
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页',icon: "index" }
            }
        ]
    },
    // 文档页
    {
        path: "/documentation",
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/documentation/index'),
                name: 'documentation',
                meta: { title: '文档', icon: "wendang" }
            }
        ]
    },
    // 错误页
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error", icon: "index"},
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401', icon: "index" },
                children: [
                    {
                        path: '4011',
                        component: () => import('@/views/error_page/4011_page'),
                        name: 'page4011',
                        meta: { title: '4011', icon: "index" },
                    }
                ]
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404', icon: "index" }
            },
        ]
    },
    // 404
    { path: "*", hidden:true, component: () => import("@/views/error_page/404_page") }
]
// 需要权限的页面
export const asyncRoutes = [

]
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
// 解决 点击路由的是否报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router
