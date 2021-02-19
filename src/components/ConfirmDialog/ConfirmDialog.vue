<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions align="right">
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="handleCancel">No</v-btn>
        <v-btn text outlined color="success" @click="handleAccept">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "confirm-dialog",
  data: function() {
    return {
      resolve: null,
      reject: null,
      dialog: false,
      title: "",
      message: "",
    };
  },
  methods: {
    open: function(title, message) {
      this.dialog = true;
      this.title = title;
      this.message = message;

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    handleAccept: function() {
      this.resolve(true);
      this.dialog = false;
    },
    handleCancel: function() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
