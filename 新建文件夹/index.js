import Vue from "vue"
import Router from "vue-router"
import Layout from "@/layout"

Vue.use(Router)
// 不需要权限的公共页面
export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true
    }
]
// 需要权限的页面
export const asyncRoutes = [
    // 医疗器械检验录入
    {
        path: "/Ylqxjylr",
        component: Layout,
        children: [
            {
                path: "Ylqxjylr",
                component: () => import("@/views/Ylqxrkgl/Ylqxjylr"),
                name: "Ylqxjylr",
                meta: {
                    title: "医疗器械检验录入",
                    icon: "icon",
                    noCache: true
                }
            }
        ]
    },
    // 医疗器械复核记录
    {
        path: "/Ylqxfhjl",
        component: Layout,
        children: [
            {
                path: "Ylqxfhjl",
                component: () => import("@/views/Ylqxfhjl/Ylqxfhjl"),
                name: "Ylqxfhjl",
                meta: {
                    title: "医疗器械复核记录",
                    icon: "icon",
                    noCache: true
                }
            }
        ]
    },
    // 医疗器械出库记录
    {
        path: "/Ylqxckjl",
        component: Layout,
        children: [
            {
                path: "Ylqxckjl",
                component: () => import("@/views/Ylqxckjl/Ylqxckjl"),
                name: "Ylqxckjl",
                meta: {
                    title: "医疗器械出库记录",
                    icon: "icon",
                    noCache: true
                }
            }
        ]
    },
    // 医疗器械销售记录
    {
        path: "/Ylqxxsjl",
        component: Layout,
        children: [
            {
                path: "Ylqxxsjl",
                component: () => import("@/views/Ylqxxsjl/Ylqxxsjl"),
                name: "Ylqxxsjl",
                meta: {
                    title: "医疗器械销售记录",
                    icon: "icon",
                    noCache: true
                }
            }
        ]
    },
    // 用户管理
    {
        path: "/UserManage",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("@/views/UserManage/UserManage"),
                name: "UserManage",
                meta: {
                    title: "用户管理",
                    icon: "peoples",
                    noCache: true
                }
            }
        ]
    },
    // 404
    {
        path: "*",
        component: () => import("@/views/error-page/404"),
        hidden: true
    }
]
const createRouter = () =>
    new Router({
        scrollBehavior: () => ({
            y: 0
        }),
        routes: constantRoutes
    })

const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router