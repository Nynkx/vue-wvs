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
      :width="width"
      :height="height"
      class="border drawing-canvas"
    ></canvas>
    <div class="wvs-recorder-buttons-group">
      <v-btn
        color="error"
        @click="handleRecord($event)"
        class="btn-record"
        v-if="!isRecording"
        ><v-icon light dark>mdi-record-circle</v-icon>Record
      </v-btn>

      <v-btn color="error" @click="handleStop" v-else
        ><v-icon light dark>mdi-record-circle</v-icon>Finish
      </v-btn>

      <v-btn @click="handleCancel" v-if="!isRecording">Cancel</v-btn>
      <v-btn @click="handleClear" v-else>Clear</v-btn>
    </div>
    <!-- <video controls ref="preview"></video> -->
  </div>
</template>

<script>
import SignaturePad from "signature_pad";

export default {
  name: "signature-recorder",
  props: ["onClose"],
  data: function() {
    return {
      width: 1,
      height: 1,
      recorder: null,
      chunks: [],
      counter: null,
      remainingTime: 10,
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
    //this.pad.off();
  },
  methods: {
    loadStream: async function() {
      var devices = await navigator.mediaDevices.enumerateDevices();
      // this.$refs.log.innerHTML = devices.filter(
      //   (device) => device.kind === "videoinput"
      // );

      let recording = this.$refs.recording;

      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: "user",
        },
      });
      console.log(stream);
      recording.srcObject = stream;
    },
    handleStream: function() {
      let context = this.videoCanvas.getContext("2d");
      let video = this.$refs.recording;
      let signCanvas = this.signCanvas;

      if (this.$refs.recording.srcObject) {
        setInterval(() => {
          context.drawImage(video, 0, 0, this.width, this.height);
          context.drawImage(signCanvas, 0, 0, this.width, this.height);

          context.font = "bold 20px Arial";
          context.fillStyle = "rgba(0,0,0,0.5)";

          let currentTime = new Date()
            .toISOString()
            .replace("T", " ")
            .replace("Z", "");

          let remainingTime = this.remainingTime + "s";

          let metrics = context.measureText("a");

          context.fillStyle = "rgba(0,0,0,0.5)";

          context.fillRect(5, 5, metrics.width * currentTime.length - 27, 25);
          context.fillRect(
            this.width - metrics.width * remainingTime.length - 5,
            5,
            metrics.width * remainingTime.length,
            25
          );
          context.fillStyle = "yellow";

          context.fillText(currentTime, 6, 25);
          context.fillStyle = "red";
          context.fillText(
            remainingTime,
            this.width - metrics.width * remainingTime.length - 5,
            25
          );
        }, 1000 / 10);
      }
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
      let audioStream = this.$refs.recording.captureStream().getAudioTracks();
      stream.addTrack(audioStream[0]);

      this.recorder = new MediaRecorder(stream, {
        mimeType: "video\/webm",
      });
      this.recorder.start();

      this.recorder.state == "recording" && console.log("start recording..."); //? log

      this.recorder.ondataavailable = (e) => {
        e.data.size && this.chunks.push(e.data);
      };

      this.recorder.onstop = (e) => {
        if (this.chunks.length) {
          var blob = new Blob(this.chunks, {
            type: "video\/webm",
          });
          var vidURL = URL.createObjectURL(blob);
          this.chunks = [];

          // this.$refs.preview.src = vidURL;
          // this.$refs.preview.onend = () => {
          //   URL.revokeObjectURL(vidURL);
          // };

          var a = document.createElement("a");
          a.style = "display:none;";
          a.href = vidURL;
          a.download = "something.webm";
          document.body.appendChild(a);
          a.click();
        }
      };

      this.counter = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime == 0 && this.recorder.state == "recording") {
          this.handleStop();
          clearInterval(this.counter);
        }
      }, 1000);
    },
    handleStop: function() {
      if (!this.isRecording) return;

      clearInterval(this.counter);
      this.isRecording = false;
      this.recorder.stop();
      this.remainingTime = 10;
    },
    handleCancel: function() {
      this.onClose();
    },
    handleClear: function() {
      this.pad.clear();
    },
    computeCanvasSize: function() {
      let windowSize = { w: window.innerWidth, h: window.innerHeight };

      if (windowSize.w <= 1024 && windowSize.w < windowSize.h) {
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
  box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.7);
  animation: pulse 1s infinite ease-in-out;
}

@keyframes pulse {
  to {
    box-shadow: 0 0 0 5px rgba(239, 83, 80, 0);
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
    // width: 100%;
  }
}
</style>
