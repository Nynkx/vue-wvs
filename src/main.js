import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/style.scss";
import "@/md-components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
