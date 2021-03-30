<template>
  <div class="login-wrapper bg-gradient--megatron">
    <div class="login-container">
      <template v-if="this.isLoginCallback">
        <v-overlay :value="overlay">
          <v-progress-linear
            indeterminate
            color="white"
            rounded
          ></v-progress-linear>
          <div style="margin-top: 20px" class="center-text">
            Please wait...
          </div>
        </v-overlay>
      </template>
      <template v-else>
        <div class="login-header">
          <FoxitIcon
            style="width: 70px; height: 70px; margin-right: 10px"
          ></FoxitIcon>
        </div>
        <div class="login-content py-2">
          <v-btn
            class="text-light"
            @click="handleLogin"
            rounded
            large
            outlined
            style="min-width: 50%"
          >
            <!-- <FoxitIcon style="width: 24px; height: 24px; margin-right: 10px"></FoxitIcon> -->
            {{ isLoggedIn ? "Logging in..." : "Login with " }}
            <FoxitLogo
              v-if="!isLoggedIn"
              class="logo"
              style="height: 24px; margin-right: 10px"
            ></FoxitLogo>
          </v-btn>
        </div>
      </template>
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

  data: function() {
    return {
      isLoginCallback: false,
    };
  },

  created: function() {
    const localState = StorageHelper.getItem("state");
    const { state, code } = this.$route.query;

    console.log(`Code: {${code}}, State: {${state}}`);
    // Retrieve the state save from local storage and check with the 'state' return from auth callback
    if (code && state === localState) {
      console.log(`Verified`);
      this.isLoginCallback = true;
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
    #ffffff,
    #ffffff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.bg-gradient--megatron {
  background: #06d6e0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #20c0e2,
    #fbd786,
    #ddffdd
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #06d6e0,
    #03d8de,
    #03d8de
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

@media only screen and (min-width: 320px) and (max-width: 1220px) {
  .login-container {
    flex: 2 1 100%;
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
