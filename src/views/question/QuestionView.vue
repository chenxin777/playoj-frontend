<template>
  <div id="questionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题目">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入题目"
        ></a-input>
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入标签"
        ></a-input-tag>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doQuery">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
        showTotal: true,
        showPageSize: true,
      }"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    >
      <template #optional="{ record }">
        <a-space direction="horizontal">
          <a-button type="primary" @click="doQuestion(record)">去答题</a-button>
        </a-space>
      </template>
      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${
            record.submitNum ? (record.acceptNum / record.submitNum) * 100 : "0"
          }% (${record.acceptNum}/${record.submitNum})`
        }}
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

const total = ref(0);
const tableRef = ref();
const router = useRouter();

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败," + res.message);
  }
};

const handlePageChange = (page) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData();
};

const handlePageSizeChange = (pageSize) => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
    pageSize: pageSize,
  };
  loadData();
};

const doQuestion = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

const doQuery = () => {
  // 重置页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  loadData();
};

onMounted(() => {
  loadData();
});

const columns = ref([
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
]);

const dataList = ref<Question[]>([]);
</script>

<style scoped>
#questionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
