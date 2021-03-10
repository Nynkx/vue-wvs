import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const Page404 = () => import("@/views/Page404.vue");

const Documents = () => import("@/components/Documents/Documents.vue");
const DocumentsList = () => import("@/components/Documents/DocumentsList");
const PDFViewer = () => import("@/components/PDFViewer/PDFViewer");

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "documents",
        //name: "Documents",
        component: Documents,
        children: [
          {
            path: "sign/:id",
            name: "Document",
            component: PDFViewer,
          },
          {
            path: "",
            name: "Documents",
            component: DocumentsList,
          },
        ],
      },
      {
        path: "",
        redirect: "/documents",
      },
    ],
  },
  {
    path: "/*",
    name: "404",
    component: Page404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
