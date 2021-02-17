import documentsAPI from "@/apis/documents.api";
import axios from "axios";

const state = {
  loading: false,
  documents: [],
  documentCount: 0,

  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 1,
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
};

const getters = {
  isLoading: (state) => state.loading,
  allDocuments: (state) => state.documents,
  documentCount: (state) => state.documentCount,
  currentPage: (state) => state.currentPage,
  itemsPerPage: (state) => state.itemsPerPage,
  totalPages: (state) => state.totalPages,
};

const actions = {
  // fetch: function({ commit }) {
  //   return documentsAPI.get("").then((res) => {
  //     commit("DOCUMENT_GET", res.data.documents);
  //   });
  // },

  fetchDocuments({ commit, state }, page) {
    const params = {
      pageNo: page,
      pageSize: state.itemsPerPage,
    };
    documentsAPI
      .get("/documents", { params })
      .then((response) => {
        const { documents, total } = response.data;
        commit("updateDocuments", { documents, total });
        commit("setCurrentPage", page);
        commit("setLoading", false);
      })
      .catch((ex) => console.error(ex));
  },
  deleteDocument({ commit, state, dispatch }, docID) {
    documentsAPI.delete(`/documents/${docID}`).then((response) => {
      dispatch("fetchDocuments", 1);
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
