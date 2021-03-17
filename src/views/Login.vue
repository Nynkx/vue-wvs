<template>
  <div class="login-wrapper">
    <div class="login-container">
      <v-btn color="primary" @click="handleLogin()">
        Login With Foxit Account</v-btn
      >
    </div>
  </div>
</template>
<script>
import StorageHelper from "../helpers/storage.helper";
import qs from "querystring";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  created: function() {
    const localState = StorageHelper.getItem("state");
    console.log(`>>> Code: ${this.$route.query.code}`);
    const { state, code } = this.$route.query;

    console.log(`Code: {${code}}, State: {${state}}`);
    // Retrieve the state save from local storage and check with the 'state' return from auth callback
    if (code && state === localState) {
      console.log(`Verified`);
      const formData = {
        code: code,
        redirectUri: "https://wvs2.foxit.co.jp/templates/login",
      };
      this.login(formData);
    }
  },
  computed: {
    ...mapGetters("auth", ["isLoading", "isLoggedIn"]),
  },

  methods: {
    ...mapActions("auth", ["login"]),

    handleLogin: function() {
      const stateObj = {
        redirectUri: "/documents",
      };

      const state = btoa(JSON.stringify(stateObj));

      const url = new URL(
        "/cas/oauth2/authorize",
        "https://cas.foxitsoftware.com"
      );

      const query = qs.stringify({
        response_type: "code",
        client_id: "4f1b3e13-2d93-435a-927b-bdd89af17875",
        redirect_uri: "https://wvs2.foxit.co.jp/templates/login",
        state: state,
      });

      const authorizeUrl = `${url}?${query}`;
      window.location.href = authorizeUrl;
    },
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        console.log("Login state changed");
        console.log("Redirect to: ", this.$router);
        this.$router.push("/documents");
      }
    },
  },
};
</script>
<style scoped>
.login-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
