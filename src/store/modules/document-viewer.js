import documentsAPI from "@/apis/documents.api";

const state = {
  loading: false,
  modified: false,

  docInfo: null,
  docFile: null,

  baseScale: 1,

  signatureVideo: null,
  otpCodeVerified: false,
};

const getters = {
  isDocLoading: (state) => state.loading,
  isDocModified: (state) => state.modified,
  docInfo: (state) => state.docInfo,
  docFile: (state) => state.docFile,
  baseScale: (state) => state.baseScale,
  signatureVideo: (state) => state.signatureVideo,
  isOTPCodeVerified: (state) => state.otpCodeVerified,
};
const mutations = {
  setDocLoading: (state, loading) => {
    state.loading = loading;
  },
  setDocModified: (state, modified) => {
    state.modified = modified;
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

  setSignatureVideo: (state, video) => {
    state.signatureVideo = video;
  },

  setOTPCodeVerified: (state, verified) => {
    state.otpCodeVerified = verified;
  },
};

const actions = {
  setBaseScale: ({ commit, state }, scale) => {
    console.log(scale);
    commit("setBaseScale", scale);
  },

  startLoading: ({ commit }) => {
    commit("setDocLoading", true);
  },
  stopLoading: ({ commit }) => {
    commit("setDocLoading", false);
  },

  setDocModifyState: ({ commit }, isDocModified) => {
    commit("setDocModified", isDocModified);
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
      console.error(err);
    }
  },

  fetchDocInfo: async ({ commit, dispatch }, docID) => {
    try {
      commit("setDocLoading", true);
      commit("setOTPCodeVerified", false);
      var response = await documentsAPI.get(`/documents/${docID}`);
      commit("setDocInfo", response.data);
      await dispatch("fetchDocFile", docID);
      commit("setDocLoading", false);
    } catch (err) {
      console.error(err);
    }
  },

  createSignatureVideo: async ({ commit }, recordedData) => {
    try {
      let formData = new FormData();
      console.log(recordedData);

      formData.append("audio", recordedData.audio, "audio.wav");
      recordedData.frames.map((frame) => {
        formData.append("frames", frame.blob, frame.name);
      });

      var res = await documentsAPI.post("documents/media/create", formData, {
        responseType: "blob",
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      commit("setSignatureVideo", res.data);
    } catch (err) {
      console.error(err);
    }
  },

  // Temporary add function
  sendOTPCode: async ({ commit }, formData) => {
    try {
      commit("setDocLoading", true);
      commit("setOTPCodeVerified", false);
      const { id } = formData;
      const params = new URLSearchParams();
      for (var entry in formData) {
        if ("id" === entry) continue;
        params.append(entry, formData[entry]);
      }
      var res = await documentsAPI.post(`documents/2fa/send/${id}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("submit status: " + res.status);
      commit("setDocLoading", false);
    } catch (ex) {
      console.error(ex);
      commit("setDocLoading", false);
    }
  },

  verifyOTPCode: async ({ commit }, formData) => {
    try {
      commit("setDocLoading", true);
      commit("setOTPCodeVerified", false);
      const { id } = formData;
      const params = new URLSearchParams();
      for (var entry in formData) {
        if ("id" === entry) continue;
        params.append(entry, formData[entry]);
      }
      var res = await documentsAPI.post(`documents/2fa/verify/${id}`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("submit status: " + res.status);
      commit("setDocLoading", false);
      commit("setOTPCodeVerified", false);
      return true;
    } catch (ex) {
      console.error(ex);
      commit("setDocLoading", false);
      return false;
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
