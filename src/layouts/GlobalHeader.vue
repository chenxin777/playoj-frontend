<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, text) => {
  selectedKeys.value = [to.path];
});

// 切换菜单
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 状态变量
const store = useStore();

setTimeout(() => {
  store.dispatch("getLoginUser", {
    userName: "admin",
    role: "admin",
  });
}, 3000);
</script>

<template>
  <a-row id="globalHeader" style="margin-bottom: 16px" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">玩 OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

#globalHeader .title {
  color: #444;
}

#globalHeader .logo {
  height: 48px;
  margin: 5px;
}
</style>
