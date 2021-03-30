<template>
  <div class="test-wrapper">
    <header>HEADER GOES HERE</header>
    <main>MAIN GOES HERE</main>
    <footer>FOOTER GOES HERE</footer>
  </div>
</template>

<style scoped lang="scss">
.test-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0;
  h main {
    flex: 1;
  }
}
</style>
