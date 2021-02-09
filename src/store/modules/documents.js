import documentsAPI from "@/apis/documents.api";

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
    return documentsAPI.get("").then((res) => {
      commit("DOCUMENT_GET", res.data.documents);
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
