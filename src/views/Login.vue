<template>
  <div class="login-wrapper">
    <v-card class="login-form" elevation="10">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form ref="login_form">
          <v-text-field v-model="username" label="User name"></v-text-field>
          <v-text-field
            v-model="password"
            type="password"
            label="Password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="handleLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin: function() {
      const cred = { username: this.username, password: this.password };
      this.$store.dispatch("auth/loginWithCredentials", cred);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  background: rgb(249, 163, 42);
  background: linear-gradient(
    0deg,
    rgba(249, 163, 42, 1) 0%,
    rgba(243, 169, 65, 1) 35%,
    rgba(231, 188, 126, 1) 100%
  );
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-form {
  margin: 0 auto;
  width: 50%;
  height: 50%;
}
</style>
