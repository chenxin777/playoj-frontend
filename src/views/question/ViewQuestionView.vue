<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制"
                  >{{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制"
                  >{{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdView :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论"></a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            <a-card v-if="question">
              <MdView :value="question.answer || ''" />
            </a-card>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form>
          <a-form-item label="编程语言">
            <a-select
              v-model="form.language"
              :style="{ width: '200px' }"
              placeholder="选择编程语言"
            >
              <a-option
                v-for="item of languageList"
                :value="item"
                :label="item"
                :key="item"
              />
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" @click="doSubmit" style="min-width: 200px"
          >提交
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from "vue";

import message from "@arco-design/web-vue/es/message";
import MdView from "@/components/MdView.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  QuestionControllerService,
  QuestionVO,
  UserQuestionAddRequest,
} from "../../../generated";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
const form = ref<UserQuestionAddRequest>({
  language: "",
  code: "",
});

const languageList = ["java", "cpp", "python", "html"];

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败," + res.message);
  }
};
const changeCode = (value: string) => {
  form.value.code = value;
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doUserQuestionUsingPost({
    ...form.value,
    questionId: question.value.id as any,
  });
  if (res.code === 0) {
    message.success("答案提交成功");
  } else {
    message.error("答案提交失败," + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
