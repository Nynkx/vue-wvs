import auth from "@/apis/auth.api";

let token = localStorage.getItem("token");

const state = {
  isAuthed: token !== null,
  token: token,
  error: null,
};

const mutations = {
  USER_lOGIN_SUCCESS: (state, payload) => {
    state.isAuthed = true;
    state.token = payload;
    state.error = null;
  },
  USER_LOGIN_FAILED: (state, payload) => {
    state.isAuthed = false;
    state.token = null;
    state.error = payload;
  },
};

const getters = {
  isAuthed: (state) => state.isAuthed,
};

const actions = {
  loginWithCredentials: ({ commit }, { username, password }) => {
    var creds = new URLSearchParams();
    creds.append("username", username);
    creds.append("password", password);

    auth.post("/login", creds).then((response) => {
      localStorage.setItem("token", response.data.token);
      commit("USER_lOGIN_SUCCESS", response.data.token);
      window.location = "/";
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
