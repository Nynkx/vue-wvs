<template>
  <div>
    <signature-recorder
      v-if="this.show"
      :onClose="this.toggleShow"
    ></signature-recorder>
    <v-btn @click="toggleShow">open recorder</v-btn>
  </div>
</template>

<script>
import SignatureRecorder from "./signature-recorder.vue";

export default {
  name: "TheContent",
  components: {
    SignatureRecorder,
  },
  data: function() {
    return {
      width: 1,
      height: 1,
      show: false,
    };
  },
  created: function() {
    // this.computeCanvasSize();
    // window.onresize = this.computeCanvasSize;
  },
  methods: {
    toggleShow: function() {
      this.show = !this.show;
    },
  },
};
</script>

// :width="this.width" // :height="this.height"
