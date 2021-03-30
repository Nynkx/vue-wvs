<template>
  <div class="wvs-container">
    <TheContent />
  </div>
</template>

<script>
import TheContent from "../TheContent/TheContent.vue";
import TheHeader from "../TheHeader/TheHeader";

export default {
  name: "Thelayout",
  components: {
    TheContent,
    TheHeader,
  },
};
</script>

<style lang="scss" scoped src="./TheLayout.scss"></style>
