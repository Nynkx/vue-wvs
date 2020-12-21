<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- msg="Welcome to Your Vue.js + TypeScript App" -->
    <TheLayout />
  </div>
</template>

<script lang="ts">
import TheLayout from "../components/TheLayout/TheLayout.vue"; // ? @ is an alias to /src

export default {
  name: "Home",
  components: {
    TheLayout,
  },
};
</script>
