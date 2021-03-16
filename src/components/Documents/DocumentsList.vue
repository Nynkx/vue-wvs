<template>
  <div class="documents-list">
    <v-card elevation="1">
      <v-card-title>
        <h2 class="font-weight-light py-4">
          Documents:
          <v-chip class="ma-2" color="primary">
            {{ documentCount }}
          </v-chip>
        </h2>
        <v-btn icon color="success" @click="handleRefresh">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-text-field
          hide-details
          rounded
          outlined
          dense
          clearable
          append-icon="mdi-magnify"
          label="Search (Case insensitive)"
          v-model="searchQuery"
          @click:append="searchDocument"
          @keydown.enter="searchDocument"
        >
        </v-text-field>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :items="displayDocuments"
          :headers="headers"
          :loading="isLoading"
          disable-pagination
          :hide-default-footer="true"
          style="position: relative;"
          item-key="name"
          :expanded.sync="expanded"
          show-expand
        >
          <template slot="body.append">
            <v-overlay :value="isLoading" absolute color="#FFFFFF"> </v-overlay>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <router-link :to="`/documents/sign/${item._id}`">{{
              item.name
            }}</router-link>
          </template>
          <!-- <template v-slot:[`item.signers`]="{ item }">
            <SignerOrder :items="getSignerList(item.metaInfo)"> </SignerOrder>
          </template> -->
          <template v-slot:[`item.actions`]="props">
            <v-btn
              icon
              color="error"
              :disabled="isLoading"
              @click="handleDocumentDelete(props.item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td colspan="2" class="pa-1">
              <SignerOrder :items="getSignerList(item.metaInfo)"> </SignerOrder>
            </td>
            <td :colspan="headers.length - 2">
              a
            </td>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-pagination
            :value="currentPage"
            :length="totalPages"
            :total-visible="6"
            color="primary"
            @input="handlePageChange"
          >
          </v-pagination>
        </v-card-actions>
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
import SignerOrder from "./SignerOrder";

export default {
  name: "DocumentsList",
  components: {
    ConfirmDialog,
    SnackBar,
    SignerOrder,
  },
  data: function() {
    return {
      expanded: [],
      searchQuery: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        // {
        //   text: "Signers",
        //   value: "signers",
        // },
        {
          text: "Size",
          value: "size",
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
      "docSearchName",
    ]),

    displayDocuments() {
      const documents = (this.allDocuments || []).map((item) => {
        return {
          ...item,
          size: this.formatBytes(item.file.size),
          // created: this.toDateString(item.created),
          // modified: this.toDateString(item.modified),
        };
      });

      return documents;
    },
  },

  created() {
    this.fetchDocuments();
  },

  methods: {
    ...mapActions("documents", [
      "fetchDocuments",
      "deleteDocument",
      "searchForDocuments",
    ]),

    handleRefresh: function() {
      console.log(">> refresh triggered");
      this.fetchDocuments(this.currentPage);
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

    getSignerList: function(metaInfo) {
      let controls = metaInfo.controls;
      return controls
        .filter((control) => control.type === "wvs-video")
        .sort((ctrl1, ctrl2) => ctrl1.sequence - ctrl2.sequence);
    },

    handlePageChange(pageNo) {
      this.fetchDocuments(pageNo);
    },

    searchDocument: function() {
      console.log(this.searchQuery);
      this.searchForDocuments(this.searchQuery);
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
</style>
