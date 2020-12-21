const state = {
  show: false,
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.show = !state.show;
  },
};

const getters = {
  show: (state) => state.show,
};

const actions = {
  toggleSidebar: ({ commit }) => {
    commit("TOGGLE_SIDEBAR");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
