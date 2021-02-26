<template>
  <div class="viewer-wrapper">
    <v-app-bar
      fixed
      absolute
      scroll-target=".viewer-container"
      style="z-index:99"
    >
      <v-btn icon @click="handleBackward">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ docInfo.name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn depressed text>
        Submit
      </v-btn>

      <v-btn depressed text>
        Reset
      </v-btn>
    </v-app-bar>
    <v-overlay :value="this.isDocLoading" style="z-index:99">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>

    <div class="viewer-container">
      <div ref="viewer" id="viewer"></div>
    </div>
    <signature-recorder
      v-if="recorderShow"
      @close="toggleRecorder"
    ></signature-recorder>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { PDFViewer, Events, ScrollWrap } from "@/foxit-lib/PDFViewCtrl.full";

import documentsAPI from "@/apis/documents.api";

import SignatureRecorder from "./SignatureRecorder.vue";

import drawIcon from "@/assets/icons/draw.svg";

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
  computed: {
    ...mapGetters("document_viewer", [
      "isDocLoading",
      "docInfo",
      "docFile",
      "baseScale",
    ]),
  },
  mounted: async function() {
    try {
      await this.initPDFViewer();

      this.docId = this.$route.params.id;

      await this.fetchDocInfo(this.docId);

      console.log("document info vvv");
      console.log(this.docInfo);

      this.pdfui.openPDFByFile(this.docFile);

      this.pdfui.eventEmitter.on(Events.renderFileSuccess, (pdfDoc) => {
        this.renderControls(this.docInfo.metaInfo.controls);
        window.onresize = this.handleWindowResize;
      });

      this.pdfui.eventEmitter.on(Events.zoomToSuccess, (newScale, oldScale) => {
        newScale = this.pdfui.getPDFPageRender(0).getScale();
        this.resizeControls(this.baseScale, newScale);
        this.setBaseScale(newScale);
        // this.handleWindowResize();
      });
    } catch (ex) {
      console.error(ex);
    }

    // TODO: render controls according to metainfo
  },
  methods: {
    ...mapActions("document_viewer", ["fetchDocInfo", "setBaseScale"]),

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

    initPDFViewer: async function() {
      var container = document.querySelector("#viewer");

      this.pdfui = new PDFViewer({
        libPath: "../../foxit-lib",
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

      this.pdfui.init("#viewer");
    },

    renderControls: function(controlsMetaInfo) {
      var viewerScale = this.pdfui.getPDFPageRender(0).getScale();
      this.setBaseScale(viewerScale);

      for (var controlInfo of controlsMetaInfo) {
        var page = this.pdfui.getPDFPageRender(controlInfo.pageNo);
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
            break;
          case "wvs-check":
            ctrl = document.createElement("input");
            ctrl.setAttribute("type", "checkbox");
            break;
          case "wvs-video":
            ctrl = document.createElement("button");
            ctrl.classList.add("v-btn");
            var icon = document.createElement("img");
            icon.src = drawIcon;
            icon.style.width = "85%";
            ctrl.setAttribute("data-signer", controlInfo.signer);
            ctrl.appendChild(icon);

            ctrl.addEventListener("click", this.toggleRecorder);
            break;
          default:
            return;
        }

        ctrl.id = controlInfo.id;

        ctrl.style.position = "absolute";

        ctrl.style.width = controlRect.width + "px";
        ctrl.style.height = controlRect.height + "px";
        ctrl.style.top = controlRect.top + "px";
        ctrl.style.left = controlRect.left + "px";

        ctrl.setAttribute("data-x", controlRect.left);
        ctrl.setAttribute("data-y", controlRect.top);
        ctrl.setAttribute("data-w", controlRect.width);
        ctrl.setAttribute("data-h", controlRect.height);

        ctrl.classList.add("control-item");

        pageDOM.appendChild(ctrl);
      }
    },

    resizeControls: function(oldScale, newScale) {
      var controls = document.querySelectorAll(".control-item");

      for (var control of controls) {
        var controlRect = this.computeRectByScale(
          {
            top: control.getAttribute("data-y"),
            left: control.getAttribute("data-x"),
            width: control.getAttribute("data-w"),
            height: control.getAttribute("data-h"),
          },
          oldScale,
          newScale
        );

        control.style.left = controlRect.left + "px";
        control.style.top = controlRect.top + "px";
        control.style.width = controlRect.width + "px";
        control.style.height = controlRect.height + "px";

        control.setAttribute("data-x", controlRect.left);
        control.setAttribute("data-y", controlRect.top);
        control.setAttribute("data-w", controlRect.width);
        control.setAttribute("data-h", controlRect.height);
      }
    },

    toggleRecorder: function() {
      this.recorderShow = !this.recorderShow;
    },

    handleWindowResize: async function() {
      try {
        await this.pdfui.redraw();
        var newScale = this.pdfui.getPDFPageRender(0).getScale();

        this.resizeControls(this.baseScale, newScale);
        this.setBaseScale(newScale);
      } catch (err) {
        console.error(err);
      }
    },
    handleBackward: function() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" src="./PDFViewer.scss"></style>
