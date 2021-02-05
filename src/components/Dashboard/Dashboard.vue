<template>
  <div>
    Dashboard
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted: () => {
    console.log(localStorage.getItem("token"));
  },
};
</script>
