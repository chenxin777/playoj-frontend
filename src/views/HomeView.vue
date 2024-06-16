<template id="exampleView">
  {{ codeValue }}
  <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
  {{ mdValue }}
  <MdEditor :value="mdValue" :handle-change="onMdChange" />
</template>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import { ref } from "vue";

const mdValue = ref("");
const codeValue = ref("");

const onMdChange = (v: string) => {
  mdValue.value = v;
};
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>
