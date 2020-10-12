import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import PageContent from '@/layout/components/AppMain'
// 使用 modules 引入嵌套过多的路由
import error_page from './modules/error'
import components from './modules/components'
Vue.use(Router)
// 公共的页面
export const constantRoutes = [
    // 登录页面
    {
        path: '/login',
        name: 'login',
        hidden: true,
        component: () => import('@/views/login')
    }
]
// 需要权限的页面
/**
 * @param {roles} 数组 用来存放路由的权限信息
 * 如果 roles 没有声明 说明所有用户都可以进入该页面
 * roles 代表的数字说明
 * 1 超级管理员
 * 2 管理员
 * 3 普通用户
 */
/**
 * 参数说明
 * @param  {hidden}: true,  该路由不在侧边栏显示
 * @param  {redirect}: 'noRedirect' , 说明该路由显示在面包屑中 但是不能被点击
 * @param  {breadcrumb}: false   说明该路由不显示在面包屑中
 * @param  {affix: true}  说明 该路由在 tags 中 初始化的时候就要显示，并且不能被删除
 */
export const asyncRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            // 首页
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard'),
                name: 'dashboard',
                meta: { title: '首页', icon: 'index', affix: true }
            },
            // 文档页
            {
                path: '/documentation',
                component: () => import('@/views/documentation'),
                name: 'documentation',
                meta: { title: '文档', icon: 'wendang', affix: true }
            },
            // 文章页
            {
                path: '/article',
                meta: { title: '文章页', icon: 'article', roles: [1, 2, 3] },
                redirect: '/article/created',
                component: PageContent,
                name: 'article',
                children: [
                    {
                        path: 'created',
                        component: () => import('@/views/article/created'),
                        name: 'articleCreated',
                        meta: { title: '文章创建', icon: 'created', roles: [1, 2] }
                    },
                    {
                        path: 'list',
                        component: () => import('@/views/article/list'),
                        name: 'articleList',
                        meta: { title: '文章列表', icon: 'list', roles: [1, 2, 3]}
                    }
                ]
            },
            // 地图
            {
                path: '/amap',
                component: () => import('@/views/map'),
                meta: { title: '地图', icon: 'map' },
                name: 'amap'
            },
            // 组件
            components,
            // 错误页
            error_page,
            // 个人中心
            {
                path: '/personal',
                component: () => import('@/views/personal'),
                hidden: true,
                meta: { title: '个人中心', icon: 'personal' },
                name: 'personalCenter'
            }
        ]
    },
    // 404
    {
        path: '*',
        hidden: true,
        component: () => import('@/views/error_page/404_page')
    }
]
const createRouter = () =>
    new Router({
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })
const router = createRouter()

// 重置路由
export const resetRouter = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

// 解决 点击路由是否报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

export default router
