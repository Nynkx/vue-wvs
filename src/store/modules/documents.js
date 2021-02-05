import documents from "@/apis/documents.api";

const state = {
  documents: {},
};

const mutations = {
  DOCUMENT_GET: (state, documents) => {
    state.documents = documents;
  },
};

const getters = {
  documents: (state) => state.documents,
};

const actions = {
  fetch: function({ commit }) {
    return documents.get().then((res) => {
      commit("DOCUMENT_GET", res.data.list);
      console.log(res.data.list);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
