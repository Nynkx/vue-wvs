const state = {
  oldScale: 1,
  newScale: 1,
};

const getters = {
  scale: (state) => state.currentScale,
};

const mutations = {
  setScale: (state, newScale) => {
    state.currentScale = newScale;
  },
};

const actions = {
  setScale: ({ commit, state }, newScale) => {
    commit("setScale", newScale);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
