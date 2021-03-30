import documentsAPI from "@/apis/documents.api";

const state = {
  loading: false,
  documents: [],
  documentCount: 0,

  currentPage: 1,
  itemsPerPage: 5,
  totalPages: 1,

  isDocDeleted: false,
  isDocSubmitted: false,

  docSearchName: "",
  statusFilter: ["new", "in-progress", "complete"],
  mailSent: false,
};

const mutations = {
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

  setDocSubmitted: (state, status) => {
    state.isDocSubmitted = status;
  },

  setDocSearchName: (state, searchName) => {
    state.docSearchName = searchName;
  },

  setDocStatusFilter: (state, arrStatus) => {
    state.statusFilter =
      arrStatus.length == 0 ? ["new", "in-progress", "complete"] : arrStatus;
  },

  setMailSent: (state, mailSent) => (state.mailSent = mailSent),
};

const getters = {
  isLoading: (state) => state.loading,
  allDocuments: (state) => state.documents,
  documentCount: (state) => state.documentCount,
  currentPage: (state) => state.currentPage,
  itemsPerPage: (state) => state.itemsPerPage,
  totalPages: (state) => state.totalPages,
  isDocDeleted: (state) => state.isDocDeleted,
  isDocSubmitted: (state) => state.isDocSubmitted,
  docSearchName: (state) => state.docSearchName,
  statusFilter: (state) => state.statusFilter,
  mailSent: (state) => state.mailSent,
};

const actions = {
  fetchDocuments({ commit, state }, page) {
    commit("setLoading", true);
    const params = {
      pageNo: page || state.currentPage,
      pageSize: state.itemsPerPage,
      ...(state.docSearchName !== "" && { name: state.docSearchName }),
      ...(state.statusFilter.length == 0 && {
        status: state.statusFilter,
      }),
      status: state.statusFilter,
    };
    console.log(params);

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

  searchForDocuments({ commit, state, dispatch }, searchName) {
    commit("setDocSearchName", searchName);
    dispatch("fetchDocuments", 1);
  },

  filterDocuments({ commit, dispatch }, arrStatus) {
    commit("setDocStatusFilter", arrStatus);
    dispatch("fetchDocuments", 1);
  },

  async deleteDocument({ commit, state, dispatch }, docID) {
    try {
      let response = await documentsAPI.delete(`/documents/${docID}`);
      commit("setDocDeleted", true);
      dispatch("fetchDocuments", state.currentPage);
    } catch (ex) {
      commit("setDocDeleted", false);
      console.error(ex);
    }

    console.log(docID);
  },
  submitDocument: async ({ commit }, payload) => {
    try {
      const { id } = payload;

      var formData = new FormData();
      for (var entry in payload) {
        formData.append(entry, payload[entry]);
      }

      var res = await documentsAPI.put(`documents/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log("submit status: " + res.status);

      commit("setDocSubmitted", true);
    } catch (ex) {
      commit("setDocSubmitted", false);
      console.error(ex);
    }
  },

  sendMail: async ({ commit }, formData) => {
    try {
      commit("setLoading", true);
      commit("setMailSent", false);
      const { id } = formData;
      const params = new URLSearchParams();
      for (var entry in formData) {
        params.append(entry, formData[entry]);
      }
      var res = await documentsAPI.post(`documents/mail-to/${id}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("submit status: " + res.status);
      commit("setLoading", false);
      commit("setMailSent", true);
    } catch (ex) {
      console.error(ex);
      commit("setLoading", false);
    }
  },

  downloadDocument: async ({ commit }, formData) => {
    try {
      commit("setLoading", true);
      const { id } = formData;
      // const options = {
      //   url: `documents/download/${id}`,
      //   responseType: "blob",
      // };
      // var res = await documentsAPI(options);

      var res = await documentsAPI.get(`documents/download/${id}`, {
        responseType: "blob",
      });
      console.log("submit status: " + res.status);
      commit("setLoading", false);
      return res.data;
    } catch (ex) {
      console.error(ex);
      commit("setLoading", false);
    }
    return null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
