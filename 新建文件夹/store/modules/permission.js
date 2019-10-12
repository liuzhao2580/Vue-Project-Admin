import { aside } from "@/api/login.js";
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = routes
    },
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            commit('SET_ROUTES', roles)
            resolve(roles)
        })
    },
    Action_GET_SIDE({ commit }) {
        return new Promise(resolve => {
            let getArrR = []
            const params = {
                GYWL2RoleId: sessionStorage.getItem('GYWL2RoleId')
            }
            aside(params).then(({ data }) => {
                asyncRoutes.forEach(item => {
                    data.forEach(DItem => {
                        if (!item.hidden && item.children[0].meta.title == DItem.par) {
                            getArrR.push(item)
                        }
                    })
                })
                getArrR.push(
                    {
                        path: '*',
                        component: () => import('@/views/error-page/404'),
                        hidden: true
                    }
                )
                const RouterData = constantRoutes.concat(getArrR)
                commit('SET_ROUTES', RouterData)
                resolve(RouterData)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
