<template>
  <div class="wvs-app">
    <TheHeader />
    <div class="wvs-wrapper border">
      <TheSidebar />
      <div class="border wvs-container">
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
