<template>
  <div ref="viewer" class="viewer-container"></div>
</template>

<script>
import * as UIExtension from "../../foxit-lib/UIExtension.full.js";
import "../../foxit-lib/UIExtension.css";

export default {
  name: "PDFViewer",
  data: function() {
    return {
      docId: "",
      //docControls: {},
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
