import AboutView from "@/views/AboutView.vue";
import NoAuth from "@/views/NoAuth.vue";
import { RouteRecordRaw } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "首页",
    component: QuestionView,
  },
  {
    path: "/question",
    name: "题目浏览",
    component: QuestionView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/view/question/:id",
    name: "答题页",
    component: ViewQuestionView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question/",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/about",
    name: "我的空间",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/401",
    name: "401",
    component: NoAuth,
    meta: {
      hideInMenu: true,
    },
  },
];
