<template>
  <div id="userRegisterView">
    <div id="userLoginView">
      <h2 style="margin-bottom: 16px">用户注册</h2>
      <a-form
        :model="form"
        @submit="handleSubmit"
        label-align="left"
        auto-label-width
        style="max-width: 480px; margin: 0 auto"
      >
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.userAccount" placeholder="请输入账号" />
        </a-form-item>
        <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item
          field="checkPassword"
          tooltip="密码不少于8位"
          label="确认密码"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" html-type="submit" style="width: 60px"
              >注册
            </a-button>
            <a-button type="primary" @click="doLogin" style="width: 60px"
              >去登录
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form.value);
  // 注册成功，跳转到主页
  if (res.code === 0) {
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败, " + res.message);
  }
};

const doLogin = () => {
  // 跳转到登录页
  router.push({
    path: "/user/login",
    replace: true,
  });
};
</script>
