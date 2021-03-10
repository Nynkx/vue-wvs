const state = {
  oldScale: 1,
  scale: 1,
};

const getters = {
  oldScale: (state) => state.oldScale,
  scale: (state) => state.scale,
};

const mutations = {
  setScale: (state, newScale) => {
    if (state.scale != newScale) {
      state.oldScale = state.scale;
      state.scale = newScale;
    }
  },

  initScale: (state, { oldScale, scale }) => {
    state.oldScale = oldScale;
    state.scale = scale;
  },
};

const actions = {
  setScale: ({ commit, state }, newScale) => {
    commit("setScale", newScale);
  },

  initScale: ({ commit, state }, { oldScale, scale }) => {
    // console.log(`${scale} ${oldScale}`);
    commit("initScale", {
      oldScale: oldScale,
      scale: scale,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
