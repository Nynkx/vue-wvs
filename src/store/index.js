import Vue from "vue";
import Vuex from "vuex";

import documents from "./modules/documents";
import document_viewer from "./modules/document-viewer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    documents,
    document_viewer,
  },
});
