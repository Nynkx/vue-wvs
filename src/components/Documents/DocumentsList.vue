<template>
  <div class="documents-list">
    <v-card elevation="1">
      <v-toolbar elevation="0">
        <v-toolbar-title>Documents: {{ documentCount }}</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table
        :items="allDocuments"
        :headers="headers"
        :loading="isLoading"
        loading-text="Loading..."
        disable-pagination
        :hide-default-footer="true"
      >
        <template v-slot:item.name="{ item }">
          <router-link :to="`/documents/sign/${item._id}`">{{
            item.name
          }}</router-link>
        </template>
        <template v-slot:item.actions="props">
          <v-btn icon @click="handleDocumentDelete(props.item._id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-pagination
        :value="currentPage"
        :length="totalPages"
        color="purple"
        @input="handlePageChange"
      ></v-pagination>
    </v-card>
  </div>
</template>
<style lang="scss" scoped>
.document-list {
  height: 100%;
  width: 100%;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DocumentsList",
  data: function() {
    return {
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Created",
          value: "created",
        },
        {
          text: "Modified",
          value: "modified",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      docCount: 0,
      // documents: [],
      // isLoading: true,
      // itemsPerPage: 5,
      // pageCount: 3,
      // currentPageIndex: 2,
    };
  },

  computed: {
    ...mapGetters("documents", [
      "allDocuments",
      "isLoading",
      "documentCount",
      "currentPage",
      "totalPages",
      "itemsPerPage",
    ]),
  },

  created() {
    this.fetchDocuments(1);
  },

  methods: {
    ...mapActions("documents", ["fetchDocuments", "deleteDocument"]),

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
    handleDocumentDelete: function(docID) {
      let answer = window.confirm("Do you want to delete this document?");
      if (answer) {
        this.deleteDocument(docID);
      }
    },

    handlePageChange(value) {
      this.fetchDocuments(value);
    },
  },
};
</script>
