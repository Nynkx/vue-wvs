<template>
  <div>
    <div v-for="(signer, idx) in items" :key="idx" x-small>
      <!-- <v-chip x-small> {{ signer.signer }} </v-chip> -->

      <v-badge
        :content="tryParseInt(signer.sequence)"
        color="green"
        class="ma-1"
        overlap
      >
        <v-chip :color="currentSigner(signer)">{{ signer.signer }} </v-chip>
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

    currentSigner: function(signer) {
      let prevSigner = this.items[signer.sequence - 1];

      if (signer.signed) return "primary";
      else if (signer.sequence === 0 || prevSigner.signed) return "success";
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
