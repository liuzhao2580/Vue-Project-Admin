import Vue from "vue"
import Router from "vue-router"
import Layout from '@/layout'
// 使用 modules 引入嵌套过多的路由
import error_page from "./modules/error"
Vue.use(Router)
// 公共的页面
/**
 * 参数说明
 * hidden: true,  该路由不在侧边栏显示
 * redirect: 'noRedirect' , 说明该路由显示在面包屑中 但是不能被点击
 * breadcrumb: false   说明该路由不显示在面包屑中
 * affix: true  说明 该路由在 tags 中不能被删除
 */
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
                meta: { title: '首页', icon: "index", affix: true }
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
                meta: { title: '文档', icon: "wendang", affix: true }
            }
        ]
    },
    // 个人中心
    {
        path: "/personal",
        component: Layout,
        hidden: true,
        children: [
            {
                path: "index",
                component: () => import("@/views/personal"),
                meta: { title: '个人中心', icon: "personal" },
                name: "personalCenter",
            }
        ]
    },
    // 文章页
    {
        path: "/article",
        component: Layout,
        meta: { title: '文章', icon: "article"},
        redirect: "noRedirect",
        children: [
            {
                path: "created",
                component: () => import("@/views/article/created"),
                name: "created",
                meta: { title: '文章创建', icon: "created"}
            },
            {
                path: "list",
                component: () => import("@/views/article/list"),
                name: "list",
                meta: { title: '文章列表', icon: "list" }
            },
        ]
    },
    // 地图
    {
        path: "/amap",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("@/views/map"),
                name: "amap",
                meta: {title: "地图", icon: "map"}
            }
        ]
    },
    // 错误页
    error_page,
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
