<template>
  <v-dialog v-model="isShowDialog" :width="customWidth">
    <v-card>
      <v-card-title class="headline grey lighten-2 mb-2">
        Video
      </v-card-title>

      <v-card-text>
        <video
          :width="customWidth"
          id="player1"
          controls
          :src="this.src"
        ></video>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="isShowDialog = false">Close</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "VideoDialog",
  data: function() {
    return {
      isShowDialog: false,
      customWidth: 700,
      src: "",
    };
  },
  methods: {
    open: function(videoSrc) {
      this.isShowDialog = true;
      this.src = videoSrc;
    },
  },
};
</script>
