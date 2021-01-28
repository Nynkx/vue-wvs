<template>
  <div class="wvs-app border">
    <TheHeader class="wvs-header" />
    <div class="wvs-wrapper border">
      <TheSidebar />
      <div class="wvs-container border">
        <TheContent />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../TheHeader/TheHeader.vue";
import TheSidebar from "../TheSidebar/TheSidebar.vue";
import TheContent from "../TheContent/TheContent.vue";

export default {
  name: "Thelayout",
  components: {
    TheHeader,
    TheSidebar,
    TheContent,
  },
};
</script>

<style lang="scss" scoped src="./TheLayout.scss"></style>
