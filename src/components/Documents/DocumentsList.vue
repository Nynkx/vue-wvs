<template src="./DocumentsList.html"> </template>
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
    this.docCount = res.data.count;
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
