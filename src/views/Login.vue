<template>
  <div class="login-wrapper bg-gradient--megatron">
    <div class="login-container">
      <div class="login-header">
        <FoxitLogo class="logo"></FoxitLogo>
      </div>
      <div class="login-content py-2">
        <v-btn
          class="text-light bg-gradient--sc"
          @click="handleLogin"
          rounded
          large
        >
          <FoxitIcon
            style="width: 24px; height: 24px; margin-right: 10px"
          ></FoxitIcon>
          Login With Foxit Account
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { StorageHelper } from "@/helpers";
import qs from "querystring";
import { mapGetters, mapActions } from "vuex";

import FoxitLogo from "@/assets/foxit-logo.svg";
import FoxitIcon from "@/assets/foxit-icon-svg.svg";

export default {
  name: "Login",
  components: {
    FoxitLogo,
    FoxitIcon,
  },
  created: function() {
    const localState = StorageHelper.getItem("state");
    const { state, code } = this.$route.query;

    console.log(`Code: {${code}}, State: {${state}}`);
    // Retrieve the state save from local storage and check with the 'state' return from auth callback
    if (code && state === localState) {
      console.log(`Verified`);
      const formData = {
        code: code,
        redirectUri: "https://wvs2.foxit.co.jp/documents/login",
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
        redirect_uri: "https://wvs2.foxit.co.jp/documents/login",
        state: state,
      });

      StorageHelper.setItem("state", state);
      const authorizeUrl = `${url}?${query}`;
      window.location.href = authorizeUrl;
    },
  },
  watch: {
    isLoggedIn(newVal) {
      if (newVal) {
        console.log("Login state changed");
        this.$router.push("/documents/");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.login-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 50%;

  .login-header {
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 75%;
    }
  }
  .login-content {
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.text-light {
  color: #ffffff !important;
}

.bg-gradient--sc {
  background: #fe8c00; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f83600,
    #fe8c00
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f83600,
    #fe8c00
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.bg-gradient--megatron {
  background-image: linear-gradient(
    16.5deg,
    rgba(203, 189, 240, 1) 24.7%,
    rgba(253, 184, 169, 1) 68.9%
  );
  // background: #c6ffdd; /* fallback for old browsers */
  // background: -webkit-linear-gradient(
  //   to top,
  //   #e5797d,
  //   #fbd786,
  //   #ddffdd
  // ); /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(
  //   to top,
  //   #e5797d,
  //   #fbd786,
  //   #ddffdd
  // ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

@media only screen and (min-width: 320px) and (max-width: 1220px) {
  .login-container {
    flex: 1 1 100%;
    height: 100vh;
    align-items: stretch;

    .login-header {
      height: 50%;
    }
    .login-content {
      height: 50%;
      align-items: flex-start;
    }
  }
}
</style>
