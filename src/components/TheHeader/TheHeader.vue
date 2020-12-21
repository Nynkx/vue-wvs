<template>
  <header class="border">
    <p>header</p>
    <button @click="handleClick">show</button>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  created: () => {
    console.log("Header Component Created!");
  },
  mounted: () => {
    console.log("Header Component Mounted!");
  },
  methods: {
    handleClick() {
      this.$store.dispatch("sidebar/toggleSidebar");
    },
  },
};
</script>

<style lang="scss" scoped src="./TheHeader.scss"></style>
