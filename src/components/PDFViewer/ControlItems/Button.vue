<template>
  <button
    class="v-btn control-item"
    :style="{
      position: 'absolute',
      left: this.dRect.left * this.scale + 'px',
      top: this.dRect.top * this.scale + 'px',
      width: this.dRect.width * this.scale + 'px',
      height: this.dRect.height * this.scale + 'px',
    }"
  >
    <img :src="this.drawIcon" />
  </button>
</template>

<script>
import drawIcon from "@/assets/icons/draw.svg";

export default {
  name: "control-item-button",
  props: ["rect", "signer", "scale"],
  destroyed: function() {},
  data: function() {
    return {
      drawIcon: drawIcon,
      dSigner: this.signer,
      dRect: this.rect,
    };
  },
  mounted: function() {},
};
</script>
