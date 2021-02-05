<template>
  <div class="documents-list">
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
            <v-skeleton-loader v-if="isLoading" type="text"></v-skeleton-loader>
            <router-link
              v-else
              :to="{
                path: `documents/sign/${document._id}`,
                props: true,
              }"
              >{{ document.name }}</router-link
            >
          </td>
          <td>
            <v-skeleton-loader v-if="isLoading" type="text"></v-skeleton-loader>
            <span v-else>{{ document.status }}</span>
          </td>
          <td>
            <v-skeleton-loader v-if="isLoading" type="text"></v-skeleton-loader>
            <span v-else>TDB</span>
          </td>
          <td>
            <v-skeleton-loader
              v-if="isLoading"
              type="paragraph"
            ></v-skeleton-loader>
            <div
              v-else
              v-for="activity in getLatestActivities(document.history)"
              :key="activity.date"
            >
              {{ `- ${activity.date}: ${activity.content}` }}
            </div>
          </td>
          <td>
            <v-skeleton-loader v-if="isLoading" type="text"></v-skeleton-loader>
            <span v-else>{{ formatBytes(document.size) }}</span>
          </td>
          <td>
            <v-skeleton-loader v-if="isLoading" type="text"></v-skeleton-loader>
            <span v-else>{{ document.created }}</span>
          </td>
          <td>
            <v-skeleton-loader v-if="isLoading" type="text"></v-skeleton-loader>
            <span v-else>{{ document.modified }}</span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
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
      isLoading: true,
    };
  },
  computed: {
    documents: function() {
      return this.$store.state.documents.documents;
    },
  },
  mounted: async function() {
    await this.$store.dispatch("documents/fetch");
    this.isLoading = false;
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

<style lang="scss" scoped>
.document-list {
  height: 100%;
  width: 100%;
}
</style>
