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
    {
        path: "/",
        redirect: "/Dashboard",
        component: Layout,
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: '首页' }
            }
        ]
    },
    {
        path: "/documentation",
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import('@/views/documentation/index'),
                name: 'documentation',
                meta: { title: '文档' }
            }
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: {title: "error"},
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error" },
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error" },
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error" },
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error" },
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error" },
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
    {
        path: "/errorPage",
        component: Layout,
        meta: { title: "error" },
        children: [
            {
                path: '401',
                component: () => import('@/views/error_page/401_page'),
                name: '401_page',
                meta: { title: '401' }
            },
            {
                path: '404',
                component: () => import('@/views/error_page/404_page'),
                name: '404_page',
                meta: { title: '404' }
            },
        ]
    },
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
