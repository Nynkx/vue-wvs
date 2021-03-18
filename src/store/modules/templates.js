import templates from '@/apis/templates.api';

const state = {
    templates: {}
}

const getters = {
    templates: function(state) {
        return state.templates;
    }
}

const mutations = {
    TEMPLATES_GET: function(state, templates) {
        state.templates = templates;
    }
}

const actions = {
    getTemplate({ commit }) {
        return templates.get().then(res => {
            commit('TEMPLATES_GET', res.data.list);
            console.l
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}

