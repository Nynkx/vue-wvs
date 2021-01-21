<template>
  <div>
    <div>
      <pdf-viewer></pdf-viewer>
    </div>
    <div>
      <v-btn @click="toggleShow">open recorder</v-btn>
    </div>
    <signature-recorder
      v-if="this.show"
      :onClose="this.toggleShow"
    ></signature-recorder>
  </div>
</template>

<script>
import SignatureRecorder from "./SignatureRecorder.vue";
import PDFViewer from "./PDFViewer.vue";

export default {
  name: "TheContent",
  components: {
    "signature-recorder": SignatureRecorder,
    "pdf-viewer": PDFViewer,
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
