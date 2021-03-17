import auth from "@/apis/auth.api";
import AuthHelper from "@/helpers/auth.helper";

let token = AuthHelper.getToken();

const state = {
  isLoggedIn: token !== null,
  token: token,
  error: null,
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  setIsLoggedIn: (state, isLoggedIn) => (state.isLoggedIn = isLoggedIn),
};

const getters = {
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
    auth(options)
      .then((res) => {
        const { token, user } = response.data;
        commit("setIsLoggedIn", true);
        commit("setToken", token);
        console.info(token.token, user);
      })
      .catch((ex) => {
        commit("setLoading", false);
        localStorage.removeItem("token");
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
