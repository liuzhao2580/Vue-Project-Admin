const state = {
    roleId: ""
}

const mutations = {
    SET_RULEID(state, roleId) {
        state.roleId = roleId
    }
}

const actions = {
    get_ruleId({ commit }, roleId) {
        commit("SET_RULEID", roleId)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
