<template>
  <div id="myQuestionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题号">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入题号"
        ></a-input>
      </a-form-item>
      <a-form-item label="编程语言">
        <a-select
          v-model="searchParams.language"
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
      <a-form-item>
        <a-button type="primary" @click="doQuery">搜索</a-button>
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
      <template #status="{ record }">
        {{ handleStatus(record.status) }}
      </template>
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const languageList = ["java", "cpp", "python", "html"];

const statusList = [
  { code: 0, text: "待判题" },
  { code: 1, text: "判题中" },
  { code: 2, text: "成功" },
  { code: 3, text: "失败" },
];

const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const total = ref(0);
const tableRef = ref();
const router = useRouter();

const handleStatus = (code: number) => {
  for (let i = 0; i < statusList.length; i++) {
    if (code === statusList[i].code) {
      return statusList[i].text;
    }
  }
  return "异常";
};

const loadData = async () => {
  const res =
    await QuestionControllerService.listMyQuestionSubmitByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "descend",
    });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败," + res.message);
  }
};

const handlePageChange = (page: any) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData();
};

const handlePageSizeChange = (pageSize: any) => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
    pageSize: pageSize,
  };
  loadData();
};

const doQuery = () => {
  // 重置页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  loadData();
};

let timer: any = null;

onMounted(() => {
  if (timer == null) {
    loadData();
  }
  timer = setInterval(loadData, 30000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const columns = ref([
  {
    title: "题目id",
    dataIndex: "questionId",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
]);

const dataList = ref<Question[]>([]);
</script>

<style scoped>
#myQuestionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
