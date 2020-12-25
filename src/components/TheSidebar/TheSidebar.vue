<template>
  <div class="sidebar border" :class="{ active: show }">
    <p>Sidebar Here</p>
  </div>
</template>

<script>
export default {
  name: "TheSidebar",
  computed: {
    show() {
      return this.$store.state.sidebar.show;
    },
  },
  mounted: () => {
    console.log("Sidebar mounted!");
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  margin-left: -300px;
  overflow-x: hidden;
  transition: margin-left 500ms ease;
}
.active {
  margin-left: 0;
}
</style>
