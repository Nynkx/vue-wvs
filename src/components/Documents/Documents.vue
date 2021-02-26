<template>
  <div class="documents-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TheContent",
};
</script>

<style scoped>
.documents-wrapper {
  flex: 1;
  overflow: auto;
}
</style>
