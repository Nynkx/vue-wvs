<template>
  <div class="wvs-app">
    <TheHeader class="wvs-header" />
    <div class="wvs-wrapper">
      <TheSidebar />
      <div class="wvs-container">
        <v-card style="height: 100%">
          <router-view></router-view>
        </v-card>
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
