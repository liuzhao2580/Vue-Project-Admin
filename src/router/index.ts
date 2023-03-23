import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import PageContent from "@/layout/components/AppMain.vue";
// 使用 modules 引入嵌套过多的路由
import error_page from "./modules/error";
import components from "./modules/components";
import { RouterName, RouterPath } from "./RouteConst";
import { UserRolesEnum } from "@/typescript/shared/enum/user-enum/user-roles.enum";
import { IMetaRouter } from "@/typescript/shared/interface/router-interface";
import setting from "@/setting";

// 公共的页面
export const constantRoutes: RouteRecordRaw[] = [
  // 登录页面
  {
    path: RouterPath.LOGIN,
    name: RouterName.LOGIN,
    meta: { hidden: true, title: "登录" },
    component: () =>
      import(/* webpackChunkName: "loginComponent" */ "@/views/login/index.vue")
  },
  // 404
  {
    path: "/:catchAll(.*)*",
    meta: {
      hidden: true,
      title: "404"
    },
    component: () =>
      import(
        /* webpackChunkName: "baseComponet" */ "@/views/error_page/404_page.vue"
      )
  }
];
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
 * @param  {breadcrumb}: false   说明该路由不显示在面包屑中
 * @param  {affix: true}  说明 该路由在 tags 中 初始化的时候就要显示，并且不能被删除
 * @param  {keepAlive} boolean 路由是否不被销毁 默认都是 false 页面关闭销毁，true 保持页面存在
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: RouterPath.LAYOUT,
    component: Layout,
    redirect: RouterPath.DASHBOARD,
    children: [
      // 首页
      {
        path: RouterPath.DASHBOARD,
        component: () =>
          import(
            /* webpackChunkName: "dashboardComponet" */ "@/views/dashboard/index.vue"
          ),
        name: RouterName.DASHBOARD,
        meta: { title: "首页", icon: "index", affix: true, keepAlive: true }
      },
      // 文档页
      {
        path: RouterPath.DOCUMENTATION,
        component: () =>
          import(
            /* webpackChunkName: "baseComponet" */ "@/views/documentation/index.vue"
          ),
        name: RouterName.DOCUMENTATION,
        meta: { title: "文档", icon: "wendang", affix: true, keepAlive: true }
      },
      // 权限管理
      {
        path: RouterPath.ADMIN,
        name: RouterName.ADMIN,
        meta: {
          title: "权限管理",
          icon: "admin"
        },
        component: PageContent,
        children: [
          {
            path: RouterPath.ADMIN_CHANGE,
            name: RouterName.ADMIN_CHANGE,
            meta: {
              title: "权限管理切换",
              icon: "admin"
            },
            component: () => import("@/views/admin/index.vue")
          },
          {
            path: RouterPath.ADMIN_TEST,
            name: RouterName.ADMIN_TEST,
            meta: {
              title: "超级管理员可见",
              icon: "admin",
              roles: [UserRolesEnum.superAdmin]
            },
            component: () => import("@/views/admin/admin-test/index.vue")
          }
        ]
      },
      // 文章页
      {
        path: RouterPath.ARTICLE,
        meta: { title: "文章页", icon: "article" },
        redirect: RouterPath.ARTICLE_CREATE,
        component: PageContent,
        name: RouterName.ARTICLE,
        children: [
          {
            path: RouterPath.ARTICLE_CREATE,
            component: () =>
              import(
                /* webpackChunkName: "article" */ "@/views/article/created/index.vue"
              ),
            name: RouterName.ARTICLE_CREATE,
            meta: {
              title: "文章创建",
              icon: "created",
              roles: [UserRolesEnum.superAdmin, UserRolesEnum.admin]
            }
          },
          {
            path: RouterPath.ARTICLE_LIST,
            component: () =>
              import(
                /* webpackChunkName: "article" */ "@/views/article/list/index.vue"
              ),
            name: RouterName.ARTICLE_LIST,
            meta: {
              title: "文章列表",
              icon: "list",
              keepAlive: true
            }
          }
        ]
      },
      // 地图
      {
        path: RouterPath.AMAP,
        component: () =>
          import(
            /* webpackChunkName: "baseComponet" */ "@/views/map/index.vue"
          ),
        meta: { title: "地图", icon: "map", keepAlive: true },
        name: RouterName.AMAP
      },
      // 组件
      components,
      // 错误页
      error_page,
      // 个人中心
      {
        path: RouterPath.PERSONAL,
        component: () =>
          import(
            /* webpackChunkName: "baseComponet" */ "@/views/personal/index.vue"
          ),

        meta: { title: "个人中心", icon: "personal", hidden: true },
        name: RouterName.PERSONAL
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(setting.basePrefix),
  routes: constantRoutes
});

/** 重置路由 只有登录和404页面 */
export const resetRouter = () => {
  const newRouter = asyncRoutes;
  newRouter.forEach(route => {
    if (route.name) router.removeRoute(route.name);
  });
};

/** 添加路由作为新的路由 */
export const insertRouter = (routes: RouteRecordRaw) => {
  resetRouter();
  router.addRoute(routes);
};

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module "vue-router" {
  interface RouteMeta extends IMetaRouter {}
}

export default router;
