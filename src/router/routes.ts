import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuth from "@/views/NoAuth.vue";
import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题集",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "管理员可见",
    component: AdminView,
    meta: {
      access: "canAdmin",
    },
  },
  {
    path: "/about",
    name: "我的空间",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/401",
    name: "401",
    component: NoAuth,
  },
];
