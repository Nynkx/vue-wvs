<template>
  <div class="documents-list">
    <TheHeader></TheHeader>
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
        <h3>Filter By:</h3>
        <v-chip-group v-model="arrDocStatus" column multiple>
          <v-chip
            filter
            outlined
            color="primary"
            value="new"
            :disabled="isLoading"
          >
            New
          </v-chip>
          <v-chip
            filter
            outlined
            color="green"
            value="in-progress"
            :disabled="isLoading"
          >
            In Progress
          </v-chip>
          <v-chip
            filter
            outlined
            value="complete"
            color="secondary"
            :disabled="isLoading"
          >
            Completed
          </v-chip>

          <v-spacer> </v-spacer>

          <v-btn
            color="primary"
            outlined
            rounded
            :disabled="isLoading"
            :href="`https://wvs2.foxit.co.jp/templates/`"
          >
            Manage Templates
          </v-btn>
        </v-chip-group>

        <v-data-table
          :items="displayDocuments"
          :headers="headers"
          :loading="isLoading"
          disable-pagination
          :hide-default-footer="true"
          style="position: relative"
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
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="item.status.color" outlined small>
              <v-icon left v-if="item.status.icon">{{
                item.status.icon
              }}</v-icon>
              {{ item.status.text }}
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="props">
            <v-btn
              icon
              color="success"
              :disabled="isLoading"
              @click="handleSendMail(props.item)"
            >
              <v-icon>mdi-email-send-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              color="error"
              :disabled="isLoading"
              @click="handleDocumentDelete(props.item)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>

            <v-btn
              v-if="props.item.status.name === 'complete'"
              icon
              color="primary"
              :disabled="isLoading"
              @click="handleDownloadDocument(props.item)"
            >
              <v-icon>mdi-download-outline</v-icon>
            </v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td colspan="3" class="pa-1">
              <SignerOrder :items="getSignerList(item.metaInfo)"> </SignerOrder>
            </td>
            <td :colspan="headers.length - 3">
              <!-- // TODO: Document Activity here  -->
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
            circle
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
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import SnackBar from "../SnackBar/SnackBar";
import SignerOrder from "./SignerOrder";
import TheHeader from "../TheHeader/TheHeader";

import axios from "axios";

export default {
  name: "DocumentsList",
  components: {
    ConfirmDialog,
    SnackBar,
    SignerOrder,
    TheHeader,
  },
  data: function() {
    return {
      expanded: [],
      searchQuery: "",
      arrDocStatus: ["new", "in-progress", "complete"],
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
          text: "status",
          value: "status",
        },
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
          align: "left",
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
      "isDocSubmitted",
      "docSearchName",
      "mailSent",
    ]),

    displayDocuments() {
      const documents = (this.allDocuments || []).map((item) => {
        return {
          ...item,
          size: this.formatBytes(item.file.size),
          status: {
            name: item.status,
            ...this.getStatusProperties(item.status),
          },
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

  mounted() {
    // check doc is submitted
    if (this.isDocSubmitted) {
      this.$refs.snackbar.open("Document submitted !");
      this.$store.commit("documents/setDocSubmitted", false);
    }
  },

  methods: {
    ...mapActions("documents", [
      "fetchDocuments",
      "deleteDocument",
      "searchForDocuments",
      "filterDocuments",
      "sendMail",
      "downloadDocument",
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

    getStatusProperties: function(status) {
      var props = {};
      switch (status) {
        case "new":
          return {
            color: "primary",
            text: "New",
          };
        case "in-progress":
          return {
            color: "success",
            text: "In Progress",
          };
        case "complete":
          return {
            color: "",
            text: "Complete",
          };
        default:
          return props;
      }
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
    handleSendMail: async function(item) {
      let nextSigner = this.getSignerList(item.metaInfo).find(
        (signer) => !signer.signed
      ).signer;
      let answer = await this.$refs.dialog.open(
        "Send mail",
        `Do you want to send sign invitation to ${nextSigner} ?`
      );
      if (!answer) return;

      const formData = {
        id: item._id,
        mailTo: nextSigner,
      };
      this.sendMail(formData);

      // let nextSigner = this.getSignerList.find(signer => )
    },

    handleDownloadDocument: async function(item) {
      const documentName = item?.name;
      const downloadDoc = await this.downloadDocument({ id: item._id });
      console.log(downloadDoc);
      if (!downloadDoc) alert("Failed to download document.");

      const url = (window.URL || window.webkitURL).createObjectURL(
        new Blob([downloadDoc])
      );

      var aLink = document.createElement("a");
      document.body.appendChild(aLink);
      aLink.href = url;
      aLink.download = decodeURI(`${documentName}.pdf`);
      aLink.click();
      aLink.remove();
      window.URL.revokeObjectURL(url);
    },

    getSignerList: function(metaInfo) {
      let controls = metaInfo.controls || [];
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
  watch: {
    arrDocStatus: function(newVal) {
      console.log(newVal);
      // TODO: fetch here
      this.filterDocuments(this.arrDocStatus);
    },

    mailSent: function(mailSent) {
      if (mailSent) this.$refs.snackbar.open("Mail Sent!");
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
