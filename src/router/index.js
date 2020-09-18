import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

import store from "@/store";

const routes = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
    // name: "home",
    // component: Home,
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/isAuthenticated"]) {
        next();
      } else {
        next({ name: "dashboard" });
      }
    },
    component: () => {
      return import("../views/Login.vue");
    },
  },
  {
    path: "/dashboard",
    component: () => {
      return import("../Layout.vue");
    },
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isAuthenticated"]) {
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
      {
        path: "collaborators",
        name: "collaborators",
        component: () => {
          return import("../views/Collaborators/index.vue");
        }
      },
      {
        path: "collaborators/create",
        name: "add collaborator",
        component: () => {
          return import("../views/Collaborators/create.vue");
        }
      },
      {
        path: "settings",
        name: "settings",
        component: () => {
          return import("@/views/User/settings.vue");
        }
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
