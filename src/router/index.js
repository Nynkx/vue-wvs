import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { AuthHelper } from "../helpers";

Vue.use(VueRouter);
const Login = () => import("@/views/Login");
const Page404 = () => import("@/views/Page404");

const Documents = () => import("@/components/Documents/Documents");
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
            path: "login",
            name: "Login",
            component: Login,
          },
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

if (process.env.NODE_ENV === "production") {
  router.beforeEach((to, from, next) => {
    const isAuthed = AuthHelper.getToken();
    console.log("isAuthed", isAuthed);
    if (to.name !== "Login" && !isAuthed) next({ name: "Login" });
    next();
  });
}

export default router;
