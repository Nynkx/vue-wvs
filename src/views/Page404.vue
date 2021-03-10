<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card color="transparent" flat>
          <div class="display-3 mt-5">Oops!</div>
          <div class="grey--text lighten-5 mt-3">
            Looks like the content you are looking is not available!
          </div>
          <!-- <div class="paragraph-text mt-2">
            <br />
            <br />Try going back to home page and repeating your action. Or,
            contact helpdesk for support.
          </div> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Page404",
  created: function() {
    console.log("404 page mounted!");
  },
};
</script>
