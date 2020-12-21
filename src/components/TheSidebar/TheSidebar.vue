<template>
  <div class="sidebar border" :class="{ active: show }">
    <p>Sidebar Here</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "TheSidebar",
  computed: {
    show() {
      return this.$store.state.sidebar.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  top: 0;
  width: 400px;
  left: -100%;
  transition: left 300ms ease-in-out;
}
.active {
  left: 0;
}
</style>
