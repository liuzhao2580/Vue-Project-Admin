import Vue from 'vue'
import router from './router'
import store from '@/store'
import VueCookies from 'vue-cookies'
import { resetRouter } from './router'
//全局引用vue-cookies
Vue.use(VueCookies)
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (to.path === '/login') {
        sessionStorage.removeItem("GYWL2RoleId")
        sessionStorage.removeItem("GYWL2UserId")
        // 清空 TagsView
        store.dispatch("tagsView/delAllVisitedViews")
        NProgress.done()
    }
    const GYWL2RoleId = sessionStorage.getItem("GYWL2RoleId")
    if (GYWL2RoleId) {
        // 说明用户刷新页面
        if (!store.getters.roleId) {
            resetRouter()
            store.dispatch("permission/Action_GET_SIDE").then((RouterData) => {
                router.addRoutes(RouterData)
            })
        }
        next()
    }
    else {
        if (to.path === '/login') {
            next();
        } else {
            next({ path: '/login' });
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})
