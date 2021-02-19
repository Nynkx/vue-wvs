<template>
  <div class="documents-list">
    <v-card elevation="1">
      <v-card-text>
        <v-toolbar elevation="0">
          <v-toolbar-title>Documents: {{ documentCount }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="success" large @click="handleRefresh">
            <v-icon>mdi-cached</v-icon>
          </v-btn>
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
            <v-btn
              icon
              :disabled="isLoading"
              @click="handleDocumentDelete(props.item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="pagination-group">
          <v-pagination
            :value="currentPage"
            :length="totalPages"
            color="primary"
            @input="handlePageChange"
          >
          </v-pagination>
        </div>
      </v-card-text>
    </v-card>
    <confirm-dialog ref="dialog"></confirm-dialog>
    <SnackBar ref="snackbar"></SnackBar>
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
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog.vue";
import SnackBar from "../SnackBar/SnackBar.vue";

export default {
  name: "DocumentsList",
  components: {
    ConfirmDialog,
    SnackBar,
  },
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
      "isDocDeleted",
    ]),
  },

  created() {
    this.fetchDocuments();
  },

  methods: {
    ...mapActions("documents", ["fetchDocuments", "deleteDocument"]),

    handleRefresh: function() {
      console.log(">> refresh triggered");
      this.fetchDocuments(this.currentPage);
    },

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
    handleDocumentDelete: async function(doc) {
      if (
        await this.$refs.dialog.open(
          "Confirm Delete",
          `Are you sure want to delete ${doc.name}`
        )
      ) {
        await this.deleteDocument(doc._id);

        if (this.isDocDeleted) {
          this.$refs.snackbar.open("Document Deleted!");
        } else {
          this.$refs.snackbar.open("Cannot Delete Document!", false);
        }
      }
    },

    handlePageChange(pageNo) {
      this.fetchDocuments(pageNo);
    },
  },
};
</script>
<style scoped>
.pagination-group {
  display: flex;
  align-content: center;
  justify-content: center;
}

@media only screen and (max-width: 1024px) {
  /* .pagination-group {
    position: fixed;
    bottom: 0;
    left: 0;
  } */
}
</style>
