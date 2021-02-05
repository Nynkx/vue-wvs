<template>
  <div class="pdf-viewer">
    <div class="btn-group">
      <button class="btn-red" @click="testMethod">Test</button>
      <button class="btn-blue">Submit</button>
    </div>
    <div ref="viewer" class="viewer-container"></div>
  </div>
</template>

<script>
import * as UIExtension from "../../foxit-lib/UIExtension.full.js";
import "../../foxit-lib/UIExtension.css";

export default {
  name: "pdf-viewer",
  data: function() {
    return {
      pdfui: null,
    };
  },
  mounted: function() {
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
  methods: {
    testMethod: async function() {
      const pages = document.querySelectorAll('.fv__pdf-page-handler-container');

      const componentContext = this;
      pages.forEach(function(page) {

        // add button to page
        const btn = document.createElement('button');
        btn.innerText = 'Record'

        // for testing without api data
        let btnPosition = {
          left: '100px',
          top: '100px'
        }

        let btnStyle = {
          width: '150px',
          height: '80px',
          background: 'red',
          color: '#fff',
          position: 'absolute',
          padding: '10px',
        }
        
        Object.assign(btn.style, { ...btnStyle, ...btnPosition});
        
        btn.addEventListener('click', componentContext.testButtonClick);

        page.appendChild(btn);

      });



    },
    testButtonClick: function() {
      this.$emit('show-recorder');
    }
  },
};
</script>
<style>

.pdf-viewer {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.viewer-container,
.viewer-container > .fv__ui-webpdf {
  flex: 1;
  overflow: auto;
}

.btn-group {
  display: flex;
  justify-content: flex-end;
}

.btn-red {
  background-color: rgb(206, 36, 36);
}

.btn-blue {
  background-color: rgb(23, 85, 219);
}

.btn-group button {
  margin: 10px 20px 0px 20px;
  color: #fff;
  padding: 10px 20px;
}
</style>
