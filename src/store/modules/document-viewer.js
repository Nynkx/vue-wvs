import documentsAPI from "@/apis/documents.api";

const state = {
  loading: false,

  docInfo: null,
  docFile: null,

  baseScale: 1,
};

const getters = {
  isDocLoading: (state) => state.loading,
  docInfo: (state) => state.docInfo,
  docFile: (state) => state.docFile,
  baseScale: (state) => state.baseScale,
};
const mutations = {
  setDocLoading: (state, loading) => {
    state.loading = loading;
  },

  setDocInfo: (state, docInfo) => {
    state.docInfo = docInfo;
  },

  setDocFile: (state, docFile) => {
    state.docFile = docFile;
  },

  setBaseScale: (state, scale) => {
    state.baseScale = scale;
  },
};

const actions = {
  setBaseScale: ({ commit, state }, scale) => {
    console.log(scale);
    commit("setBaseScale", scale);
  },

  fetchDocFile: async ({ commit }, docID) => {
    try {
      var pdfFileRes = await documentsAPI.get(`/documents/doc/${docID}`, {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/pdf",
        },
      });
      console.log(pdfFileRes.data);
      commit("setDocFile", pdfFileRes.data);
    } catch (err) {
      console.err(err);
    }
  },

  fetchDocInfo: async ({ commit, dispatch }, docID) => {
    try {
      commit("setDocLoading", true);
      var response = await documentsAPI.get(`/documents/${docID}`);
      commit("setDocInfo", response.data);
      await dispatch("fetchDocFile", docID);
      commit("setDocLoading", false);
    } catch (err) {
      console.error(err);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
