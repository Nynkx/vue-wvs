<template>
  <header>
    <md-toolbar>
      <md-button @click="handleClick()">button</md-button>
      <span class="md-title">Header</span>
    </md-toolbar>
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
