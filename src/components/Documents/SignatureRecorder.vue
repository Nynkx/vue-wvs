<template>
  <div class="wvs-recorder">
    <div class="vid-recorder">
      <video
        autoplay
        playsinline
        muted
        ref="recording"
        @play="handleStream()"
        style="display:none;"
      ></video>
    </div>
    <canvas
      ref="videoCanvas"
      :width="width"
      :height="height"
      class="border video-canvas"
    ></canvas>
    <canvas
      ref="signCanvas"
      v-show="isRecording"
      :width="width"
      :height="height"
      class="border drawing-canvas"
    ></canvas>
    <div class="wvs-recorder-buttons-group">
      <div class="btn-group-left"></div>

      <div class="center">
        <v-tooltip top v-if="!isRecording">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              large
              @click="handleRecord($event)"
              class="btn-record"
              v-bind="attrs"
              v-on="on"
              ><v-icon light color="error">mdi-checkbox-blank-circle</v-icon>
            </v-btn>
          </template>
          <span>Start Recording</span>
        </v-tooltip>

        <v-tooltip top v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              class="btn-record"
              color="error"
              @click="handleStop"
              v-bind="attrs"
              v-on="on"
              ><v-icon light dark>mdi-square</v-icon>
            </v-btn>
          </template>
          <span>Finish Recording</span>
        </v-tooltip>
      </div>

      <div class="btn-group-right">
        <v-tooltip top v-if="!isRecording">
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab small @click="handleCancel" v-bind="attrs" v-on="on">
              <v-icon light dark>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>Cancel</span>
        </v-tooltip>

        <v-tooltip top v-else>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab small @click="handleClear" v-bind="attrs" v-on="on">
              <v-icon light dark>mdi-eraser</v-icon>
            </v-btn>
          </template>
          <span>Cancel</span>
        </v-tooltip>
      </div>
    </div>
    <!-- <video controls ref="preview"></video> -->
  </div>
</template>

<script>
import SignaturePad from "signature_pad";

export default {
  name: "signature-recorder",
  data: function() {
    return {
      width: 1,
      height: 1,
      recorder: null,
      canvasInterval: "",
      chunks: [],
      countdown: null,
      remainingTime: 30,
      isRecording: false,
      pad: null,
    };
  },
  computed: {
    videoCanvas: function() {
      return this.$refs.videoCanvas;
    },
    signCanvas: function() {
      return this.$refs.signCanvas;
    },
    recording: function() {
      return this.$refs.recording;
    },
  },
  created: function() {
    this.computeCanvasSize();
    window.onresize = this.computeCanvasSize;
  },
  mounted: function() {
    this.loadStream();
    this.pad = new SignaturePad(this.signCanvas, {
      minWidth: 1.5,
      maxWidth: 7,
      penColor: "black",
    });
    this.pad.off();
  },
  beforeDestroy: function() {
    this.recording.srcObject.getTracks().forEach((track) => track.stop());
    clearInterval(this.canvasInterval);
    console.log(this.recording.srcObject.getTracks());
  },
  methods: {
    loadStream: async function() {
      // var devices = await navigator.mediaDevices.enumerateDevices();
      // this.$refs.log.innerHTML = devices.filter(
      //   (device) => device.kind === "videoinput"
      // );

      let recording = this.recording;

      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: "user",
        },
      });
      recording.srcObject = stream;
    },
    handleStream: function() {
      let context = this.videoCanvas.getContext("2d");
      let video = this.recording;
      let signCanvas = this.signCanvas;

      this.canvasInterval = setInterval(() => {
        context.drawImage(video, 0, 0, this.width, this.height);
        context.drawImage(signCanvas, 0, 0, this.width, this.height);

        context.font = "bold 20px Times New Roman";
        context.fillStyle = "rgba(0,0,0,0.5)";

        let currentTime = new Date()
          .toISOString()
          .replace("T", " ")
          .replace("Z", "");
        let remainingTime = this.remainingTime + "s";
        let metrics = context.measureText("a");

        //*Draw Text Background
        context.fillStyle = "rgba(0,0,0,0.5)";

        context.fillRect(5, 5, metrics.width * currentTime.length - 20, 25);
        context.fillRect(
          this.width - metrics.width * remainingTime.length - 5,
          5,
          metrics.width * remainingTime.length,
          25
        );

        //* Draw Text
        context.fillStyle = "yellow";
        context.fillText(currentTime, 6, 25);

        context.fillStyle = "red";
        context.fillText(
          remainingTime,
          this.width - metrics.width * remainingTime.length - 5,
          25
        );
      }, 1000 / 10);
    },
    handleRecord: function(event) {
      if (this.isRecording) {
        return;
      }

      alert(
        `Recording will be finished automatically after ${this.remainingTime}s`
      );

      this.isRecording = true;
      this.pad.on();

      let stream = this.videoCanvas.captureStream(10);
      let audioStream = this.recording.captureStream().getAudioTracks()[0];

      stream.addTrack(audioStream);

      this.recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      this.recorder.start();

      //* log
      this.recorder.state == "recording" && console.log("start recording...");

      this.recorder.ondataavailable = (e) => {
        e.data.size && this.chunks.push(e.data);
      };

      this.recorder.onstop = () => {
        // TODO: get data and send to server (the code below is just for tesing purpose)
        console.log(this.chunks);

        if (this.chunks.length) {
          var blob = new Blob(this.chunks, {
            type: "video/webm",
          });
          var vidURL = URL.createObjectURL(blob);
          this.chunks = [];

          var image = this.pad.toDataURL("image/png");
          console.log(this.chunks);

          var a = document.createElement("a");
          a.style = "display:none;";
          a.href = vidURL;
          a.download = "signature.webm";
          document.body.appendChild(a);
          //a.click();

          this.$emit("close");
        }
      };

      this.countdown = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime == 0 && this.recorder.state == "recording") {
          this.handleStop();
        }
      }, 1000);
    },
    handleStop: function() {
      if (!this.isRecording) return;

      this.turnOffCamera();
      clearInterval(this.countdown);
      this.isRecording = false;
      this.recorder.stop();
      this.remainingTime = 10;
    },
    turnOffCamera: function() {
      const stream = this.recording.srcObject;

      let tracks = stream.getTracks();
      tracks.map((track) => track.stop());
    },
    handleCancel: function() {
      this.$emit("close");
    },
    handleClear: function() {
      this.pad.clear();
    },
    computeCanvasSize: function() {
      let windowSize = { w: window.innerWidth, h: window.innerHeight };

      if (windowSize.w <= 1024 && windowSize.w < windowSize.h) {
        //* log
        console.log("mobile");

        this.width = windowSize.w;
        this.height = (windowSize.h * 10) / 19;
      } else {
        this.width = windowSize.w * 0.7;
        this.height = windowSize.h;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wvs-recorder {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vid-recorder {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: black;
}

.wvs-recorder-buttons-group {
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1002;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 75px;
  overflow: auto;
  button {
    margin: 0 9px;
  }
}

.video-canvas,
.drawing-canvas {
  position: absolute;
  top: 0;
}
.drawing-canvas {
  opacity: 0;
}

.btn-record {
  box-shadow: 0 0 0 0 rgba(239, 180, 180, 0.7);
  animation: pulse 1.1s infinite ease-in-out;
}
// rgba(239, 83, 80, 0.7)

[class^="btn-group-"] {
  // background: red;
  flex: 2;
}
.center {
}

@keyframes pulse {
  to {
    box-shadow: 0 0 0 7px rgba(239, 180, 180, 0);
  }
}

@media only screen and (max-width: 1024px) and (orientation: portrait) {
  .wvs-recorder {
    flex-direction: row;
  }
  .video-canvas,
  .drawing-canvas {
    left: 0;
    top: auto;
  }
}
</style>
