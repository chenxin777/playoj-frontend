<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <RouterView />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
  .bytemd-toolbar-icon.bytemd-tippy-right:last-child {
    display: none;
  }
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
/**
 * 全局初始化函数,全局单次调用的代码
 */
const doInit = () => {
  console.log("hello app.vue");
};

onMounted(() => {
  doInit();
});

const debounce = (fn: any, delay: any) => {
  let timer: any;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const resizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends resizeObserver {
  constructor(callback: any) {
    callback = debounce(callback, 200);
    super(callback);
  }
};
</script>
