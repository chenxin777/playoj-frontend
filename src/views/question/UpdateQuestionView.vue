<template>
  <div id="addQuestionView">
    <h2>修改题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="form.title"
          style="max-width: 600px"
          placeholder="请输入标题"
        ></a-input>
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          style="max-width: 600px"
          placeholder="请输入标签"
          allow-clear
        ></a-input-tag>
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 400px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              size="large"
              min="0"
            ></a-input-number>
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              size="large"
              min="0"
            ></a-input-number>
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              size="large"
              min="0"
            ></a-input-number>
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <div class="wrapped-space">
            <a-space direction="vertical" style="min-width: 480px">
              <a-form-item
                :field="`form.judgeCase[${index}].input`"
                :label="`输入用例-${index}`"
                :key="index"
              >
                <a-input v-model="judgeCaseItem.input" placeholder="输入" />
              </a-form-item>

              <a-form-item
                :field="`form.judgeCase[${index}].output`"
                :label="`输出用例-${index}`"
                :key="index"
              >
                <a-input
                  v-model="judgeCaseItem.output"
                  placeholder="输出"
                ></a-input>
              </a-form-item>
              <a-button
                @click="handleDelete"
                status="danger"
                style="margin-bottom: 16px"
                >删除
              </a-button>
            </a-space>
          </div>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline" status="success"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>
      <div style="margin-top: 16px"></div>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

const form = ref<QuestionAddRequest>({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: [
    {
      memoryLimit: 0,
      stackLimit: 0,
      timeLimit: 0,
    },
  ],
  tags: [],
  title: "",
});

/**
 * 新增用例
 */
const handleAdd = () => {
  if (form.value.judgeCase) {
    form.value.judgeCase.push({
      input: "",
      output: "",
    });
  }
};

/**
 * 删除用例
 * @param index
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};

const doSubmit = async () => {
  const res = await QuestionControllerService.addQuestionUsingPost(form.value);
  if (res.code === 0) {
    message.success("创建成功");
  } else {
    message.error("创建失败," + res.message);
  }
};
</script>

<style scoped>
#addQuestionView .wrapped-space {
  display: inline-block;
  border: 1px solid black; /* 设置边框颜色和宽度 */
  border-radius: 4px; /* 圆角边框 */
  padding: 8px; /* 内边距 */
  margin: 8px;
}
</style>
