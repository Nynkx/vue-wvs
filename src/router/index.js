import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const Login = () => import("@/views/Login.vue");
const Page404 = () => import("@/views/Page404.vue");

const Documents = () => import("@/components/Documents/Documents.vue");
const Dashboard = () => import("@/components/Dashboard/Dashboard.vue");

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "documents",
        name: "Documents",
        component: Documents,
      },
      {
        path: "",
        name: "Dashboard",
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

router.beforeEach((to, from, next) => {
  const publicRoutes = ["/login", "/register"];
  const authRequired = !publicRoutes.includes(to.path);

  const isAuthed = localStorage.getItem("token");

  if (authRequired && !isAuthed) {
    return next("/login");
  }

  if (!authRequired && isAuthed) {
    return next("/");
  }
  next();
});

export default router;
