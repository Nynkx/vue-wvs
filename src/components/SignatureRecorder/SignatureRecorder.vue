<template>
  <div class="wvs-recorder">
    <div class="vid-recorder">
      <video
        autoplay
        playsinline
        muted
        ref="recording"
        @play="handleStream()"
        style="opacity: 0"
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
    <div class="wvs-recorder-buttons-group" v-if="isStreamLoaded">
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
import AudioRecorder from "@bigear/microphone-recorder";

export default {
  name: "signature-recorder",
  data: function() {
    return {
      width: 1,
      height: 1,
      chunks: [],
      pad: null,
      canvasInterval: "",
      countdown: null,
      mediaStream: null,
      audioContext: null,
      audioRecorder: null,
      remainingTime: 30,
      isRecording: false,
      isStreamLoaded: false,
      useMediaRecorder: false,
      frameIndex: 0,
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
    // detect safari  browser (3.0+ ) (in researching)
    // console.log(navigator);

    this.loadStream();

    // setup signature pad
    this.pad = new SignaturePad(this.signCanvas, {
      minWidth: 1.5,
      maxWidth: 7,
      penColor: "black",
    });
    this.pad.off();
  },
  beforeDestroy: function() {
    this.recording.srcObject.getTracks().map((track) => track.stop());
    clearInterval(this.canvasInterval);
  },
  methods: {
    loadStream: async function() {
      let recording = this.recording;

      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: "user",
        },
      });
      recording.srcObject = stream;

      // init audio context
      try {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        let context = new AudioContext();
        console.log(context);
        this.audioContext = context;
      } catch (e) {
        alert(e);
      }

      //init media stream
      this.mediaStream = stream;

      this.isStreamLoaded = true;
    },
    handleStream: function() {
      let context = this.videoCanvas.getContext("2d");
      let video = this.recording;
      let signCanvas = this.signCanvas;
      let fps = 10;

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

        //* Start recording when conditions met
        if (this.isRecording) {
          this.takeCanvasSnapShot().then((blob) => {
            var image = {
              name: `img${("000" + this.frameIndex++).slice(-4)}.jpeg`,
              blob: blob,
            };
            this.chunks.push(image);
          });
        }
        //*------------------------------------
      }, 1000 / fps);
    },
    takeCanvasSnapShot: function() {
      return new Promise((resolve, reject) => {
        this.videoCanvas.toBlob(resolve, "image/jpeg");
      });
    },
    snapSignature: function() {
      return new Promise((resolve, reject) => {
        this.signCanvas.toBlob(resolve, "image/jpeg");
      });
    },
    initAudioRecorder() {
      // require audioContext
      try {
        this.audioContext.createGain();
        this.audioContext.resume();

        let audioStream = new MediaStream([
          ...this.mediaStream.getAudioTracks(),
        ]);

        const audioInput = this.audioContext.createMediaStreamSource(
          audioStream
        );
        const recorder = new AudioRecorder(audioInput);
        this.audioRecorder = recorder;
        this.audioRecorder.record();
      } catch (e) {
        console.log("init audio recorder: ", e);
      }
    },
    handleRecord: function(event) {
      if (this.isRecording) {
        return;
      }

      alert(
        `Recording will be finished automatically after ${this.remainingTime}s`
      );

   
      this.initAudioRecorder();
      this.isRecording = true;
      this.pad.on();

      this.countdown = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime == 0) {
          this.handleStop();
        }
      }, 1000);
    },
    getAudioBlobs() {
      return new Promise((resolve, reject) => {
        this.audioRecorder.exportWAV("audio/wav", (blob) => {
          resolve(blob);
        });
      });
    },
    handleStop: async function() {
      if (!this.isRecording) return;

      // this.turnOffCamera();
      clearInterval(this.countdown);


      // send blobs to server
      let recordedBlobs = await this.getAudioBlobs();
      let imageBlob = this.pad.toDataURL();

      var recordedData = {
        frames: this.chunks,
        audio: recordedBlobs,
        image: imageBlob,
      };

      this.$emit("data-available", recordedData);
      this.$emit("close");

      this.isRecording = false;
    },
    handleCancel: function() {
      this.$emit("close");
    },
    handleClear: function() {
      this.pad.clear();
    },
    turnOffCamera: function() {
      const stream = this.recording.srcObject;

      let tracks = stream.getTracks();
      tracks.map((track) => track.stop());
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

<style lang="scss" scoped src="./SignatureRecorder.scss"></style>
