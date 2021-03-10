<template>
  <div class="viewer-wrapper">
    <v-app-bar style="z-index:99" fixed hide-on-scroll scroll-target="#viewer">
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text color="error" :disabled="false" @click="downloadDoc">
          <v-icon class="px-1">mdi-download</v-icon>
          (Dev) Download Document
        </v-btn>
        <v-btn text color="success" :disabled="false">
          <v-icon class="px-1">mdi-upload</v-icon>
          Submit
        </v-btn>

        <v-btn
          text
          color="primary"
          :disabled="false"
          @click="handelResetDocument"
        >
          <v-icon class="px-1">mdi-reload</v-icon>
          Reset
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-overlay :value="this.isDocLoading" style="z-index:99">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>

    <div ref="viewer" class="viewer-container" id="viewer"></div>

    <signature-recorder
      v-if="recorderShow"
      @close="toggleRecorder"
      @data-available="handleRecordedData"
    ></signature-recorder>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import {
  PDFViewer,
  Events,
  PDF,
  ScrollWrap,
} from "@/foxit-lib/PDFViewCtrl.full";

import SignatureRecorder from "../SignatureRecorder/SignatureRecorder.vue";

export default {
  name: "PDFViewer",
  computed: {},
  components: {
    "signature-recorder": SignatureRecorder,
  },
  data: function() {
    return {
      docId: "",
      pdfViewer: null,
      recorderShow: false,
      title: "",
      controls: [],
      selectedControl: null,
      annotID: "",
    };
  },
  computed: {
    ...mapGetters("document_viewer", [
      "isDocLoading",
      "docInfo",
      "docFile",
      "baseScale",
      "signatureVideo",
    ]),
  },
  updated: function() {
    if (!this.recorderShow) {
      window.onresize = this.handleWindowResize;
    }
  },
  mounted: async function() {
    try {
      this.initPDFViewer();

      this.docId = this.$route.params.id;

      await this.fetchDocInfo(this.docId);
      this.title = this.docInfo.name;

      console.log("document info vvv");
      console.log(this.docInfo);

      this.pdfViewer.openPDFByFile(
        new Blob([this.docFile], { type: "application/pdf" })
      );

      this.pdfViewer.eventEmitter.on(Events.renderFileSuccess, (pdfDoc) => {
        this.renderControls(this.docInfo.metaInfo.controls);
      });

      // this.pdfViewer.eventEmitter.on(
      //   Events.zoomToSuccess,
      //   (newScale, oldScale) => {
      //     newScale = this.pdfViewer.getPDFPageRender(0).getScale();
      //     this.resizeControls(this.baseScale, newScale);
      //     this.setBaseScale(newScale);
      //   }
      // );

      this.pdfViewer.eventEmitter.on(Events.pageLayoutRedraw, (pageRender) => {
        this.resizeControls(pageRender.getScale());
        this.setBaseScale(pageRender.getScale());
      });

      window.onresize = this.handleWindowResize;
    } catch (ex) {
      console.error(ex);
    }
  },
  methods: {
    ...mapActions("document_viewer", [
      "fetchDocInfo",
      "setBaseScale",
      "createSignatureVideo",
      "startLoading",
      "stopLoading",
    ]),

    base64ToArrayBuffer: function(base64) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    },

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

    initPDFViewer: function() {
      var container = document.querySelector("#viewer");

      this.pdfViewer = new PDFViewer({
        libPath: "../foxit-lib",
        jr: {
          readyWorker: window.readyWorker,
        },
        customs: {
          ScrollWrap: class CustomScrollWrap extends ScrollWrap {
            constructor(viewerRender) {
              super(viewerRender);
            }
            getScrollHost() {
              return container;
            }
            getScrollOffsetTop() {
              return this.viewerRender.$ui[0].offsetTop;
            }
            getScrollOffsetLeft() {
              return this.viewerRender.$ui[0].offsetLeft;
            }
            getWidth() {
              return container.offsetWidth - 30;
            }
            getHeight() {
              return container.offsetHeight;
            }
            getScrollTop() {
              return container.scrollTop;
            }
            getScrollLeft() {
              return container.scrollLeft;
            }
          },
        },
      });
      this.pdfViewer.init("#viewer");
    },

    renderControls: function(controlsMetaInfo) {
      var viewerScale = this.pdfViewer.getPDFPageRender(0).getScale();
      this.setBaseScale(viewerScale);

      for (var controlInfo of controlsMetaInfo) {
        var page = this.pdfViewer.getPDFPageRender(controlInfo.pageNo);
        var pageDOM = page.$ui[0];

        var controlRect = this.computeRectByScale(
          controlInfo.deviceRect,
          controlInfo.scale,
          this.baseScale
        );

        var ctrl = null;

        switch (controlInfo.type) {
          case "wvs-text":
            ctrl = document.createElement("input");
            ctrl.classList.add("control-item__text");
            ctrl.setAttribute("type", "text");
            ctrl.setAttribute("autocomplete", "off");
            ctrl.style["font-size"] = controlRect.height - 3 + "px";
            break;
          case "wvs-check":
            ctrl = document.createElement("input");
            ctrl.setAttribute("type", "checkbox");
            break;
          case "wvs-video":
            ctrl = document.createElement("button");
            ctrl.classList.add("v-btn");
            var icon = document.createElement("i");
            icon.classList.add(
              "v-icon",
              "mdi",
              "mdi-draw",
              "deep-orange--text"
            );
            icon.style.transform = `scale(${Math.max(
              controlRect.height,
              controlRect.width
            ) * 0.03})`;

            ctrl.setAttribute("data-signer", controlInfo.signer);
            ctrl.appendChild(icon);
            ctrl.addEventListener("click", this.showRecorder);

            break;
          default:
            return;
        }
        ctrl.classList.add("control-item");

        ctrl.id = controlInfo.id;

        ctrl.style.width = controlRect.width + "px";
        ctrl.style.height = controlRect.height + "px";
        ctrl.style.top = controlRect.top + "px";
        ctrl.style.left = controlRect.left + "px";

        ctrl.setAttribute("data-x", controlInfo.deviceRect.left);
        ctrl.setAttribute("data-y", controlInfo.deviceRect.top);
        ctrl.setAttribute("data-w", controlInfo.deviceRect.width);
        ctrl.setAttribute("data-h", controlInfo.deviceRect.height);
        ctrl.setAttribute("data-scale", controlInfo.scale);
        ctrl.setAttribute("data-pageno", controlInfo.pageNo);
        ctrl.setAttribute("data-type", controlInfo.type);

        pageDOM.appendChild(ctrl);
      }
      console.log(this.controls);
    },

    resizeControls: function(newScale) {
      var controls = document.querySelectorAll(".control-item");
      for (var control of controls) {
        var controlRect = this.computeRectByScale(
          {
            top: control.getAttribute("data-y"),
            left: control.getAttribute("data-x"),
            width: control.getAttribute("data-w"),
            height: control.getAttribute("data-h"),
          },
          control.getAttribute("data-scale"),
          newScale
        );

        control.style.left = controlRect.left + "px";
        control.style.top = controlRect.top + "px";
        control.style.width = controlRect.width + "px";
        control.style.height = controlRect.height + "px";
      }
    },

    toggleRecorder: function() {
      this.recorderShow = !this.recorderShow;
    },
    showRecorder: function(e) {
      this.recorderShow = true;
      let button = e.target.id ? e.target : e.target.parentNode;

      console.log({
        signer: button.getAttribute("data-signer"),
        "page-index": button.getAttribute("data-pageno"),
      });

      this.selectedControl = button;
    },

    handleWindowResize: async function() {
      try {
        await this.pdfViewer.redraw();
      } catch (err) {
        console.error(err);
      }
    },
    handleRecordedData: async function(recordedData) {
      this.startLoading();

      await this.createSignatureVideo(recordedData);

      let pageIndex = this.selectedControl.getAttribute("data-pageno");
      let pdfPageRender = this.pdfViewer.getPDFPageRender(pageIndex);
      let insertRect = this.selectedControl.getBoundingClientRect();
      insertRect.y = this.selectedControl.offsetTop;
      insertRect.x = this.selectedControl.offsetLeft;

      await this.insertSignatureVideo(
        this.signatureVideo,
        insertRect,
        pageIndex,
        pdfPageRender.getScale()
      );

      console.log(recordedData.image);

      let img = this.base64ToArrayBuffer(recordedData.image.split(",")[1]);

      await this.insertSignature(
        img,
        insertRect,
        pageIndex,
        pdfPageRender.getScale()
      );

      this.selectedControl.parentNode.removeChild(this.selectedControl);
      this.selectedControl = null;
    },

    handelResetDocument: function() {
      this.pdfViewer.openPDFByFile(
        new Blob([this.docFile], { type: "application/pdf" })
      );
    },
    insertSignature: function(signImg, insertRect, pageIndex, scale) {
      let pdfDoc = this.pdfViewer.getCurrentPDFDoc();
      pdfDoc.getPageByIndex(pageIndex).then((page) => {
        let deviceRect = page.reverseDeviceRect(insertRect, scale);
        console.log(deviceRect);
        page
          .addImage(signImg, {
            left: deviceRect.left,
            top: deviceRect.top,
            right: deviceRect.right,
            bottom: deviceRect.bottom,
          })
          .then()
          .catch((error) => console.error(error));
      });
    },

    insertSignatureVideo: async function(
      videoBlob,
      insertRect,
      pageIndex,
      scale
    ) {
      let pdfDoc = this.pdfViewer.getCurrentPDFDoc();
      let reader = new FileReader();
      reader.onload = (event) => {
        let buffer = new Uint8Array(event.target.result);
        pdfDoc.getPageByIndex(pageIndex).then((page) => {
          let deviceRect = page.reverseDeviceRect(insertRect, scale);
          console.log(deviceRect);
          page
            .addAnnot({
              type: PDF.annots.constant.Annot_Type.screen,
              rect: {
                left: deviceRect.left,
                top: deviceRect.top,
                right: deviceRect.right,
                bottom: deviceRect.bottom,
              },
              opacity: 0.5,
              contentType: "video/mpeg",
              multiBuffer: buffer,
              fileName: `svs-${new Date().getTime()}.mp4`,
            })
            .then((annots) => {
              console.log("Attach file success", annots);
              this.annotID = annots[0].id;
              console.log(this.annotID);
              this.stopLoading();
            })
            .catch((error) => console.error(error));
        });
      };
      reader.readAsArrayBuffer(videoBlob);
    },

    //! test function
    downloadDoc: function() {
      let pdfDoc = this.pdfViewer.getCurrentPDFDoc();
      let buffer = [];
      pdfDoc
        .getStream(({ arrayBuffer, offset, size }) => {
          buffer.push(arrayBuffer);
        })
        .then((size) => {
          let blob = new Blob(buffer, { type: "application/pdf" });

          let a = document.createElement("a");
          a.style = "display:none;";
          a.href = URL.createObjectURL(blob);
          a.download = "signature.pdf";
          document.body.appendChild(a);
          a.click();
        });
    },
  },
};
</script>
<style lang="scss" src="./PDFViewer.scss"></style>
