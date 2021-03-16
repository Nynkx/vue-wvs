<template>
  <div>
    <v-stepper vertical elevation="0">
      <h3 class="pt-2 pl-2">Signers Order:</h3>
      <template v-for="(signer, idx) in items">
        <v-stepper-step :step="idx" :key="signer.name">
          {{ signer.signer }}
        </v-stepper-step>
        <v-stepper-content :key="idx" :step="idx"></v-stepper-content>
      </template>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: ["items"],

  methods: {
    tryParseInt(str) {
      try {
        return this.stringifyNumber(parseInt(str) + 1);
      } catch (e) {
        console.error(e);

        return this.stringifyNumber(1);
      }
    },

    stringifyNumber(number) {
      try {
        const stringNumberArray = [
          "zeroth",
          "1st",
          "2nd",
          "3rd",
          "4th",
          "5th",
          "6th",
          "7th",
          "8th",
          "9th",
          "10th",
        ];
        return stringNumberArray[number + 1];
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>

<style lang="scss">
.v-timeline::before {
  top: 50px !important;
  height: calc(100% - 100px) !important;
}
</style>
