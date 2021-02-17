<template>
  <div style="height: 100%;">
    <!-- <v-btn @click="toggleRecorder" color="primary">Open Recorder</v-btn> -->
    <div ref="viewer" class="viewer-container"></div>
    <signature-recorder
      v-if="recorderShow"
      @close="toggleRecorder"
    ></signature-recorder>
  </div>
</template>

<script>
import * as UIExtension from "../../foxit-lib/UIExtension.full.js";
import "../../foxit-lib/UIExtension.css";

import documentsAPI from "@/apis/documents.api";

import SignatureRecorder from "./SignatureRecorder.vue";

export default {
  name: "PDFViewer",
  computed: {},
  components: {
    "signature-recorder": SignatureRecorder,
  },
  data: function() {
    return {
      docId: "",
      pdfui: null,
      recorderShow: false,
    };
  },
  mounted: async function() {
    const ViewerEvents = UIExtension.PDFViewCtrl.ViewerEvents;
    this.docId = this.$route.params.id;

    var pdfRes = await documentsAPI.get(`/${this.docId}`);

    var docObj = pdfRes.data;

    console.log(docObj);

    var pdfFileRes = await documentsAPI.get(`/documents/doc/${this.docId}`, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/pdf",
      },
    });

    const libPath = "/foxit-lib/";
    this.pdfui = new UIExtension.PDFUI({
      viewerOptions: {
        libPath,
        jr: {
          readyWorker: window.readyWorker,
        },
      },
      renderTo: this.$refs.viewer,
      appearance: UIExtension.appearances.adaptive,
      template: `
      <webpdf>
        <viewer></viewer>
      </webpdf>
      `,
    });

    // console.log(pdfFileRes);

    // TODO: render controls according to metainfo

    this.pdfui.getPDFViewer().then((viewer) => {
      viewer.openPDFByFile(pdfFileRes.data);

      viewer.eventEmitter.on(ViewerEvents.renderFileSuccess, (pdfDoc) => {
        var page = viewer.getPDFPageRender(0);
        var pageDOM = page.$ui[0];

        var ctrl = document.createElement("div");
        ctrl.id = "wvs-testcontrol-001";
        ctrl.style.width = "100px";
        ctrl.style.height = "100px";
        ctrl.classList.add("control-item");

        ctrl.style.top = "100px";
        ctrl.style.left = "100px";
        ctrl.style.cursor = "pointer";
        ctrl.addEventListener("click", (e) => {
          this.toggleRecorder();
        });

        ctrl.innerHTML = "Sign Test";

        pageDOM.appendChild(ctrl);

        // var page = viewer.getPDFPageRender(0);
        // var pageDOM = page.$ui[0];

        // var docControls = docObj.controls;

        // for (var control of docControls) {
        //   var controlRect = this.computeRectByScale(
        //     control.deviceRect,
        //     control.scale,
        //     page.getScale()
        //   );

        //   var ctrl = document.createElement("div");
        //   ctrl.id = control.id;
        //   ctrl.style.width = controlRect.width + "px";
        //   ctrl.style.height = controlRect.height + "px";
        //   ctrl.classList.add("control-item");

        //   ctrl.style.top = controlRect.top + "px";
        //   ctrl.style.left = controlRect.left + "px";
        //   if (control.type === "svs" && control.signer === docObj.nextSigner) {
        //     ctrl.style.cursor = "pointer";
        //     ctrl.addEventListener("click", (e) => {
        //       this.toggleRecorder();
        //     });
        //   }

        //   pageDOM.appendChild(ctrl);
        // }
        console.log("File Loaded!");
      });
    });
  },
  methods: {
    computeRectByScale: function(rect, oldScale, newScale) {
      var newRect = {
        top: (rect.top / oldScale) * newScale,
        left: (rect.left / oldScale) * newScale,
        bottom: (rect.bottom / oldScale) * newScale,
        right: (rect.right / oldScale) * newScale,
        width: (rect.width / oldScale) * newScale,
        height: (rect.height / oldScale) * newScale,
      };

      return newRect;
    },
    toggleRecorder: function() {
      this.recorderShow = !this.recorderShow;
    },
  },
};
</script>
<style>
.viewer-container,
.viewer-container > .fv__ui-webpdf {
  height: 100%;
}

.control-item {
  background: orange;
  position: absolute;
  z-index: 50;
}
</style>
