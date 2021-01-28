import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const About = () => import("@/views/About.vue");
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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
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

//router.beforeEach();

export default router;
