<template>
  <div class="app default-layout">
    <TheHeader />
    <div class="wrapper">
      <TheSidebar />
    </div>
  </div>
</template>

<script>
import TheHeader from "../TheHeader/TheHeader.vue";
import TheSidebar from "../TheSidebar/TheSidebar.vue";

export default {
  name: "Thelayout",
  components: {
    TheHeader,
    TheSidebar,
  },
};
</script>

<style lang="scss" scoped src="./TheLayout.scss"></style>
