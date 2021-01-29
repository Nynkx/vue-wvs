<template>
  <header>
    <v-app-bar>
      <!-- <v-btn @click="handleClick()">button</v-btn> -->
      <!-- <v-app-bar-nav-icon @click="handleClick()"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Vue-WVS2</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field
        prepend-inner-icon="mdi-magnify"
        label="Search..."
        solo
        hide-details="true"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-toolbar-title>a</v-toolbar-title>
      <v-toolbar-title>a</v-toolbar-title>
      <v-toolbar-title>a</v-toolbar-title>
    </v-app-bar>
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
