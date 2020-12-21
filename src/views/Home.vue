<template>
  <TheLayout />
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
