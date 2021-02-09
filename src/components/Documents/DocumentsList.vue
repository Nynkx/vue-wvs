<template>
  <div class="documents-list">
    <v-toolbar>
      <v-toolbar-title>Documents: {{ this.docCount }}</v-toolbar-title>
    </v-toolbar>
    <v-skeleton-loader
      style="width:100%;"
      v-if="isLoading"
      type="table-thead, table-tbody"
    ></v-skeleton-loader>
    <v-simple-table v-else fixed-header>
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
                path: `/documents/sign/${document._id}`,
                props: true,
              }"
              >{{ document.name }}</router-link
            >
          </td>
          <td>
            <span>{{ document.status }}</span>
          </td>
          <td>
            <span>TBD</span>
          </td>
          <td v-if="document.history">
            <div
              v-for="activity in getLatestActivities(document.history)"
              :key="activity.date"
            >
              {{ `- ${activity.date}: ${activity.content}` }}
            </div>
          </td>
          <td v-else>
            <span>TBD</span>
          </td>
          <td>
            <span>{{ formatBytes(document.file.size) }}</span>
          </td>
          <td>
            <span>{{ document.created }}</span>
          </td>
          <td>
            <span>{{ document.modified }}</span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>
<style lang="scss" scoped>
.document-list {
  height: 100%;
  width: 100%;
}
</style>

<script>
import documentsAPI from "@/apis/documents.api";

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
      docCount: 0,
      documents: [],
      isLoading: true,
    };
  },
  mounted: async function() {
    var res = await documentsAPI.get("", {
      params: {
        key: "123456",
      },
    });

    this.docCount = res.data.total;
    this.documents = res.data.documents;
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
