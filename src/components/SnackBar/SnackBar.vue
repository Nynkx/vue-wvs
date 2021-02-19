<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    :color="isSuccess ? 'success' : 'error'"
  >
    {{ message }}
    <v-spacer></v-spacer>
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "SnackBar",
  data: function() {
    return {
      timeout: 0,
      snackbar: false,
      message: "",
      isSuccess: true,
    };
  },
  methods: {
    open: function(message, isSuccess = true, timeout = 5000) {
      this.message = message;
      this.timeout = timeout;
      this.isSuccess = isSuccess;

      this.snackbar = true;
    },
  },
};
</script>
