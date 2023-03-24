import { RouteRecordRaw } from "vue-router"
import PageContent from "@/layout/components/AppMain.vue"
import { RouterName, RouterPath } from "../RouteConst"
const error_page: RouteRecordRaw = {
  path: RouterPath.ERROR_PAGE,
  meta: { title: "Error", icon: "error" },
  redirect: RouterPath.ERROR_PAGE_401,
  component: PageContent,
  name: RouterName.ERROR_PAGE,
  children: [
    {
      path: RouterPath.ERROR_PAGE_401,
      component: () => import("@/views/error_page/401_page.vue"),
      name: RouterName.ERROR_PAGE_401,
      meta: { title: "401", icon: "401", breadcrumb: false },
      redirect: RouterPath.ERROR_PAGE_4011,
      children: [
        {
          path: RouterPath.ERROR_PAGE_4011,
          component: () =>
            import(
              /* webpackChunkName: "errorPage" */ "@/views/error_page/4011_page.vue"
            ),
          name: RouterName.ERROR_PAGE_4011,
          meta: { title: "4011", icon: "warn" }
        }
      ]
    },
    {
      path: RouterPath.ERROR_PAGE_404,
      component: () =>
        import(
          /* webpackChunkName: "errorPage" */ "@/views/error_page/404_page.vue"
        ),
      name: RouterName.ERROR_PAGE_404,
      meta: { title: "404", icon: "404" }
    }
  ]
}
export default error_page
