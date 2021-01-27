<template>
  <v-card>
    <v-navigation-drawer class="sidebar" :class="{ active: show }">
      <v-list-item>
        Dashboard
      </v-list-item>
    </v-navigation-drawer>
  </v-card>
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
  z-index: 10000;
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
