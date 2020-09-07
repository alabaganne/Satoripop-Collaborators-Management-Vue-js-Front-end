import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

import store from "@/store";

const storeInit = store.dispatch("auth/attempt", localStorage.getItem("token"));

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        next();
      } else {
        next({ name: "dashboard" }); // !
      }
    },
    component: () => {
      return import("../views/Login.vue");
    },
  },
  {
    path: "/dashboard",
    component: () => {
      return import("../DashboardLayout.vue");
    },
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        next();
      } else {
        next({ name: "login" });
      }
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => {
          return import("../views/Dashboard.vue");
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
