import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import documents from "./modules/documents";
import document_viewer from "./modules/document-viewer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    documents,
    document_viewer,
  },
});
