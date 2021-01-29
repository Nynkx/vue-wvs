<template>
  <div class="documents-wrapper">
    <div class="pdf-viewer">
      <pdf-viewer v-on:show-recorder="toggleShow"></pdf-viewer>
    </div>
    <div>
      <!-- <v-btn @click="toggleShow">open recorder</v-btn> -->
      <signature-recorder
        v-if="this.show"
        :onClose="this.toggleShow"
      ></signature-recorder>
    </div>
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
      show: false,
    };
  },
  methods: {
    toggleShow: function() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.documents-wrapper {
  // border: 2px red solid;
  height: 100%;
  display: flex;
  overflow: auto;

  .pdf-viewer {
    flex: 1;
    // border: 5px green solid;
  }
}
</style>
