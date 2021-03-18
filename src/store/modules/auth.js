import auth from "@/apis/auth.api";
import { AuthHelper } from "@/helpers/";

let token = AuthHelper.getToken();

const state = {
  loading: false,
  isLoggedIn: false,
  token: token,
  error: null,
};

const mutations = {
  setLoading: (state, loading) => (state.loading = loading),
  setToken: (state, token) => {
    state.token = token;
  },
  setIsLoggedIn: (state, isLoggedIn) => (state.isLoggedIn = isLoggedIn),
};

const getters = {
  isLoading: (state) => state.loading,
  isLoggedIn: (state) => state.isLoggedIn,
  token: (state) => state.token,
};

const actions = {
  login: async ({ commit }, formData) => {
    console.log("Logging in...");
    const options = {
      method: "POST",
      url: "/auth-sv/oauth/authorize",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formData,
    };
    commit("setIsLoggedIn", false);
    auth(options)
      .then((res) => {
        const { token, user } = res.data;
        commit("setLoading", false);
        commit("setIsLoggedIn", true);
        commit("setToken", token);
        AuthHelper.setToken(token.token);
        console.info(token.token, user);
      })
      .catch((ex) => {
        commit("setLoading", false);
        commit("setIsLoggedIn", false);
        AuthHelper.removeToken();
        console.error(ex);
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
