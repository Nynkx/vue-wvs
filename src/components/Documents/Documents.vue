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

<style lang="scss" scoped>
.documents-wrapper {
  height: 100%;
  flex-wrap: wrap;
  overflow: auto;
  flex: 1;

  .pdf-viewer {
    height: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
