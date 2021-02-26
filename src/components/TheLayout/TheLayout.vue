<template>
  <div class="wvs-container">
    <TheContent />
  </div>
</template>

<script>
import TheContent from "../TheContent/TheContent.vue";

export default {
  name: "Thelayout",
  components: {
    TheContent,
  },
};
</script>

<style lang="scss" scoped src="./TheLayout.scss"></style>
