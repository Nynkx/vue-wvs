<template>
  <div>
    <div v-for="(signer, idx) in items" :key="idx" x-small>
      <!-- <v-chip x-small> {{ signer.signer }} </v-chip> -->

      <v-badge :content="tryParseInt(signer.sequence)" color="green" inline class="xs-2">
        <v-btn class="ma-2" depressed>{{ signer.signer }} </v-btn>
      </v-badge>
    </div>
  </div>

  <!-- <v-timeline align-top dense>
    <v-timeline-item v-for="(signer, idx) in items" :key="idx" small :color="cyan">
      <v-badge :content="signer.sequence">
        {{ signer.signer }}
      </v-badge>
    </v-timeline-item>
  </v-timeline> -->
</template>

<script>
export default {
  data: () => ({
    mockupItems: ["nam@foxit.co.jp", "huy@foxit.co.jp", "cuong@foxit.co.jp", "xuan@foxit.co.jp"],
  }),
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
        const stringNumberArray = ["zeroth", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
        return stringNumberArray[number];
      } catch (e) {}
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
