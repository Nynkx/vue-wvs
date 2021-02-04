<template>
  <v-simple-table fixed-header>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="document in documents" :key="document._id">
        <td>
          <router-link
            :to="{
              path: `documents/sign/${document._id}`,
              props: true,
            }"
            >{{ document.name }}</router-link
          >
        </td>
        <td>{{ document.status }}</td>
        <td>TBD</td>
        <td>
          <div
            v-for="activity in getLatestActivities(document.history)"
            :key="activity.date"
          >
            {{ `- ${activity.date}: ${activity.content}` }}
          </div>
        </td>
        <td>
          {{ formatBytes(document.size) }}
        </td>
        <td>{{ document.created }}</td>
        <td>{{ document.modified }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  name: "DocumentsList",
  data: function() {
    return {
      headers: [
        "Name",
        "Status",
        "Signers",
        "Activity",
        "Size",
        "Created",
        "Modified",
      ],
    };
  },
  computed: {
    documents: function() {
      return this.$store.state.documents.documents;
    },
  },
  mounted: function() {
    this.$store.dispatch("documents/fetch");

    console.log(this.documents);
  },
  methods: {
    getLatestActivities: function(history) {
      return history.length > 5
        ? history.slice(history.length - 6, history.length - 1)
        : history;
    },
    formatBytes: function(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },
};
</script>
