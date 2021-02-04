<template>
  <div style="height: 100%;">
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
import documents from "@/apis/documents.api";

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
  mounted: function() {
    this.docId = this.$route.params.id;

    console.log(this.docId);

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
      addons: [
        `${libPath}uix-addons/file-property`,
        `${libPath}uix-addons/multi-media`,
        `${libPath}uix-addons/password-protect`,
        `${libPath}uix-addons/redaction`,
        `${libPath}uix-addons/path-objects`,
        `${libPath}uix-addons/print`,
        `${libPath}uix-addons/full-screen`,
        `${libPath}uix-addons/import-form`,
        `${libPath}uix-addons/export-form`,
        `${libPath}uix-addons/undo-redo`,
      ].concat(
        UIExtension.PDFViewCtrl.DeviceInfo.isMobile
          ? []
          : `${libPath}uix-addons/text-object`
      ),
      template: `
      <webpdf>
        <toolbar name="toolbar">
          <open-file-dropdown></open-file-dropdown>\
        </toolbar>
        <viewer></viewer>
      </webpdf>
      `,
    });

    documents.get(`/${this.docId}`).then((res) => {
      var doc = res.data.document;

      const ViewerEvents = UIExtension.PDFViewCtrl.ViewerEvents;

      console.log(res.data);

      documents
        .get(`/doc/${doc.path}`, {
          params: {
            id: doc._id,
            doc: doc.path,
          },
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/pdf",
          },
        })
        .then((res) => {
          var blob = new Blob([res.data], { type: "application/pdf" });

          //console.log(res.data);

          // var a = document.createElement("a");
          // a.style = "display:none;";
          // a.href = pdfurl;
          // a.download = doc.path;
          // document.body.appendChild(a);
          // a.click();

          this.pdfui.getPDFViewer().then((viewer) => {
            viewer
              .openPDFByFile(blob)
              .then((pdfDoc) => {
                pdfDoc.loadPDFForm();
                console.log(pdfDoc.getPDFForm());
              })
              .catch((err) => console.log(err));

            viewer.eventEmitter.on(ViewerEvents.renderFileSuccess, (pdfDoc) => {
              console.log(doc.controls);

              var page = viewer.getPDFPageRender(0);
              var pageDOM = page.$ui[0];

              var docControls = doc.controls;

              for (var control of docControls) {
                var controlRect = this.computeRectByScale(
                  control.deviceRect,
                  control.scale,
                  page.getScale()
                );

                var ctrl = document.createElement("div");
                ctrl.id = control.id;
                ctrl.style.width = controlRect.width + "px";
                ctrl.style.height = controlRect.height + "px";
                ctrl.classList.add("control-item");

                ctrl.style.top = controlRect.top + "px";
                ctrl.style.left = controlRect.left + "px";
                if (
                  control.type === "svs" &&
                  control.signer === doc.nextSigner
                ) {
                  ctrl.style.cursor = "pointer";
                  ctrl.addEventListener("click", (e) => {
                    this.toggleRecorder();
                  });
                }

                pageDOM.appendChild(ctrl);
              }
            });

            viewer.eventEmitter.on(
              ViewerEvents.renderPageSuccess,
              (pageRender) => {}
            );
          });
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
