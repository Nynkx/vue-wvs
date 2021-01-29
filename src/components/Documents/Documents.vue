<template>
  <div class="documents-wrapper">
    <div class="pdf-viewer">
      <v-btn @click="toggleShow">open recorder</v-btn>
      <v-btn @click="logout">logout</v-btn>
      <pdf-viewer></pdf-viewer>
    </div>
    <div style="display:none;">
      <!-- <signature-recorder
        v-if="this.show"
        :onClose="this.toggleShow"
      ></signature-recorder> -->
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
    logout: () => {
      localStorage.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
.documents-wrapper {
  //border: 2px red solid;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  .pdf-viewer {
    //border: 5px green solid;
    height: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
