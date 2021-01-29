<template>
  <div class="sidebar" :class="{ active: show }" @mouseleave="hideSidebar">
    <span class="wvs-sidebar--icon" @click="test" @mouseenter="test">
      <v-icon :class="{ 'icon-hide': show }">mdi-chevron-right</v-icon>
    </span>
    <v-card class="wvs-sidebar--menu">
      <v-list dense>
        <v-list-item
          v-for="item in navItems"
          :key="item.name"
          link
          :to="item.to"
          @click="hideSidebar"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.name }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
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
  data: function() {
    return {
      navItems: [
        {
          to: "/",
          name: "Home",
          icon: "mdi-home",
        },
        {
          to: "/documents",
          name: "Documents",
          icon: "mdi-folder",
        },
        {
          to: "/logout",
          name: "Logout",
          icon: "mdi-logout",
        },
      ],
    };
  },
  mounted: () => {
    console.log("Sidebar mounted!");
  },
  methods: {
    hideSidebar: function() {
      this.$store.dispatch("sidebar/hideSidebar");
    },
    test: function() {
      this.$store.dispatch("sidebar/toggleSidebar");
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  max-height: 90%;
  margin-left: -300px;
  z-index: 999997;
  transition: margin-left 500ms ease;

  .wvs-sidebar--menu {
    z-index: 999999;
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    a:hover {
      text-decoration: none;
    }
  }

  .wvs-sidebar--icon {
    width: 40px;
    height: 40px;
    //cursor: pointer;
    position: absolute;
    right: -40px;
    top: 4px;
    background: white;
    z-index: 999998;
    //border: 1px black solid;
    border-radius: 0 4px 4px 0;

    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

    .icon-hide {
      transform: rotate(-180deg);
    }

    i {
      width: 100%;
      height: 100%;
    }
  }
}
.wvs-sidebar--icon__active {
  opacity: 1 !important;
  background: red;
}
.active {
  margin-left: 0;
}
</style>
