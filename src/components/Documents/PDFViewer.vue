<template>
  <div ref="viewer" class="viewer-container"></div>
</template>

<script>
import * as UIExtension from "../../foxit-lib/UIExtension.full.js";
import "../../foxit-lib/UIExtension.css";
import documents from "@/apis/documents.api";

export default {
  name: "PDFViewer",
  computed: {},
  data: function() {
    return {
      docId: "",
      pdfui: null,
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
      documents
        .get(`/doc/${doc.path}?id=${doc._id}&doc=${doc.path}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            responseType: "arraybuffer",
            dataType: "blob",
            Accept: "application/pdf",
          },
        })
        .then((res) => {
          var blob = new Blob([res.data], { type: "application/pdf" });
          console.log(blob);
          var pdfurl = URL.createObjectURL(blob);

          //console.log(res.data);

          var a = document.createElement("a");
          a.style = "display:none;";
          a.href = pdfurl;
          a.download = doc.path;
          document.body.appendChild(a);
          a.click();

          this.pdfui.getPDFViewer((viewer) => {
            viewer.openPDFByFile();
          });
        });
    });
  },
  methods: {},
};
</script>
<style>
.viewer-container,
.viewer-container > .fv__ui-webpdf {
  height: 100%;
}
</style>
