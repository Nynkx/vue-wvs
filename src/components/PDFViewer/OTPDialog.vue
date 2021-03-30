<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title ref="s" class="headline grey lighten-2">
        Code Verification
      </v-card-title>
      <div class="text-center">
        <v-card-text>
          <v-avatar color="#ccc" size="62" style="margin: 20px">
            <v-icon x-large color="white" style="padding: 10px"
              >mdi-cellphone</v-icon
            >
          </v-avatar>
        </v-card-text>
        <h3>Verify your phone number</h3>
        <v-card-text
          >An OTP Code has been sent to your phone. Please input the received
          code below.</v-card-text
        >
      </div>

      <v-card-text>
        <div class="otp">
          <template v-for="digit in numOfDigits">
            <div :key="digit" class="text-center">
              <v-text-field
                ref="digit"
                v-model="otp[digit - 1]"
                maxlength="1"
                align="center"
                type="tel"
                class="mx-1 centered-input"
                style="text-align: center"
                @input="onChange($event, digit)"
                @paste="onPaste($event, digit)"
                @keydown="onKeydown($event, digit)"
                @keyup="onKeyup($event, digit)"
                @focus="setCurrentDigit($event, digit)"
              ></v-text-field>
            </div>
          </template>
        </div>
      </v-card-text>
      <!-- <v-card-text v-if="">

      </v-card-text> -->
      <v-card-actions align="right">
        <v-btn
          :disabled="resendInterval > 0"
          color="success"
          @click="handleSendOTP()"
          >Resend
          <span v-if="resendInterval > 0">({{ resendInterval }})</span></v-btn
        >
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="handleCancel">Cancel</v-btn>
        <v-btn
          text
          color="success"
          :disabled="!isCompleted"
          @click="handleAccept"
          >Verify</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import documentsAPI from "@/apis/documents.api";
import { mapGetters } from "vuex";

export default {
  name: "otp-dialog",
  props: ["digits"],
  data: function() {
    return {
      resolve: null,
      reject: null,
      dialog: false,
      title: "Code Verification",
      message: "",
      numOfDigits: this.digits || 6,
      currentDigit: 0,
      otp: [],
      prevKey: "",
      resendInterval: 60,
      // code: [],
    };
  },

  computed: {
    // ...mapGetters("document-viewer", "")
    isCompleted: function() {
      return this.otp?.join("").length === this.numOfDigits;
    },
  },

  updated: function() {},

  methods: {
    open: function(title, message) {
      this.dialog = true;
      this.title = title;
      this.message = message;

      this.handleSendOTP();

      return new Promise((resolve, reject) => {
        console.log("dasdadg");
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    close: function() {
      this.dialog = false;
    },
    handleAccept: function() {
      this.resolve(true);
      // this.dialog = false;
      this.$emit("approve", this.otp.join(""));
    },
    handleCancel: function() {
      this.resolve(false);
      // this.dialog = false;
      this.$emit("cancel");
    },

    isNumber: function(value) {
      return /^[0-9]$/.test(value);
    },

    onChange: function(value, digit) {
      console.log(JSON.stringify(this.otp));

      if (value.length > 0) this.nextDigit(digit);
    },

    onPaste: async function(event, digit) {
      let paste = (event.clipboardData || window.clipboardData).getData("text");
    },

    onKeydown: async function(event, digit) {
      console.log(digit);
      if (
        this.isNumber(event.key) ||
        ["Backspace", "Delete"].includes(event.key)
      ) {
        this.prevKey = event.key;
      } else {
        event.preventDefault();
      }
    },

    onKeyup: function(event, digit) {
      console.log(event.key);
      // if (["Backspace", "Delete"].includes(event.key));
      switch (event.key) {
        case "Backspace":
        case "Delete":
        case "ArrowLeft":
          this.prevDigit(digit);
          break;
        case "ArrowRight":
          this.nextDigit(digit);
          break;
        default:
          break;
      }
    },

    nextDigit: function(digit) {
      if (this.numOfDigits > digit) this.$refs.digit[digit].focus();
    },
    prevDigit: function(digit) {
      if (1 < digit) this.$refs.digit[digit - 2].focus();
    },

    setCurrentDigit: function(event, digit) {
      event.target.select();
    },
    handleSendOTP: function() {
      this.resendInterval = 60;

      this.$emit("sendOTP");

      this.startInterval();
    },

    startInterval: function() {
      let interval = setInterval(() => {
        this.resendInterval--;

        if (this.resendInterval === 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.centered-input ::v-deep input {
  text-align: center;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::selection {
    background-color: none;
  }
}

.otp {
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
