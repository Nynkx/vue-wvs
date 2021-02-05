<template>
  <div class="documents-wrapper">
    <router-view :docId="this.$data" docControls=""></router-view>
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
  mounted: function() {
    // documents.get().then((res) => {
    //   this.documents = res.data.list;
    //   console.log(this.documents);
    // });
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
  //border: 2px red solid;
  height: 100%;
  //display: flex;
  flex-wrap: wrap;
  overflow: auto;
  flex: 1;

  .pdf-viewer {
    //border: 5px green solid;
    height: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
