import documentsAPI from "@/apis/documents.api";

const state = {
  loading: false,
  documents: [],
  documentCount: 0,

  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 1,

  isDocDeleted: false,
};

const mutations = {
  // DOCUMENT_GET: (state, documents) => {
  //   state.documents = documents;
  // },

  setLoading: (state, loading) => {
    state.loading = loading;
  },

  setCurrentPage: (state, currentPage) => {
    state.currentPage = currentPage;
  },

  setDocuments: (state, documents) => {
    state.documents = documents;
  },

  setTotalPages: (state, totalPages) => {
    state.totalPages = totalPages;
  },

  updateDocuments: (state, data) => {
    const { documents, total } = data;
    const totalPages = total ? Math.ceil(total / state.itemsPerPage) : 1;
    state.documents = documents;
    state.totalPages = totalPages;
    state.documentCount = total;
  },

  setDocDeleted: (state, status) => {
    state.isDocDeleted = status;
  },
};

const getters = {
  isLoading: (state) => state.loading,
  allDocuments: (state) => state.documents,
  documentCount: (state) => state.documentCount,
  currentPage: (state) => state.currentPage,
  itemsPerPage: (state) => state.itemsPerPage,
  totalPages: (state) => state.totalPages,
  isDocDeleted: (state) => state.isDocDeleted,
};

const actions = {
  fetchDocuments({ commit, state }, page) {
    commit("setLoading", true);
    const params = {
      pageNo: page || state.currentPage,
      pageSize: state.itemsPerPage,
    };
    documentsAPI
      .get("/documents", { params })
      .then((response) => {
        const { documents, total } = response.data;
        commit("updateDocuments", { documents, total });
        commit("setCurrentPage", params.pageNo);
        commit("setLoading", false);
      })
      .catch((ex) => console.error(ex));
  },

  async deleteDocument({ commit, state, dispatch }, docID) {
    try {
      let response = await documentsAPI.delete(`/documents/${docID}`);
      console.log(response);
      commit("setDocDeleted", true);
      dispatch("fetchDocuments", 1);
    } catch (ex) {
      commit("setDocDeleted", false);
      console.error(ex);
    }

    console.log(docID);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
