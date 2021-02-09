import templates from "@/store/modules/templates";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const Login = () => import("@/views/Login.vue");
const Logout = () => import("@/views/Logout.vue");
const Page404 = () => import("@/views/Page404.vue");

const Documents = () => import("@/components/Documents/Documents.vue");
const Templates = () => import("@/components/Templates/Templates.vue");
const DocumentsList = () => import("@/components/Documents/DocumentsList");
const PDFViewer = () => import("@/components/Documents/PDFViewer.vue");
const Dashboard = () => import("@/components/Dashboard/Dashboard.vue");

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
        name: "Dashboard",
        redirect: "/documents",
        alias: ["/home", "/dashboard"],
        component: Dashboard,
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
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
