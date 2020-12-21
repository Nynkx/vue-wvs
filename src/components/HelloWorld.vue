<template>
  <div>
    <TheHeader />
    {{ msg }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "../components/TheHeader/TheHeader.vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    TheHeader,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
