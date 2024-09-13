<template>
  <div class="base-container">
    <BaseTable :search-params="searchParams" :columns="columns" :data="tableData" :loading="loading"
      @update:page="handleUpdatePage" @update:size="handleUpdatePageSize" />
  </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui';
import type { BaseTableColumn } from '@/components/BaseTable/types';
import { fetchTableDataPage } from '@/api/table/index.ts';
import { useLoading } from '@/hooks/loading';

const [loading, setLoading] = useLoading();

const searchParams = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

const columns: BaseTableColumn[] = [
  { title: 'id', align: "center", key: "index", width: 60, fixed: "left", render: (_, index) => `${index + 1}` },
  { title: '编号', key: 'no', },
  { title: '名称', key: 'name', },
  { title: '头像', key: 'avatar', render: (row) => h(NAvatar, { size: 48, src: row.avatar + '', }) },
  { title: '地址', key: 'address', },
  { title: '开始日期', key: 'beginTime' },
  { title: '结束日期', key: 'endTime' },
  { title: '状态', key: 'status' },
  { title: '创建时间', key: 'date' },
  { title: '停留时间', key: 'time' },
];

const tableData = ref<any>([]);

async function getTableData() {
  try {
    setLoading(true);
    const { page, pageSize, total, data } = await fetchTableDataPage(searchParams.value);
    searchParams.value.page = page!;
    searchParams.value.pageSize = pageSize!;
    searchParams.value.total = total!;
    tableData.value = data;
  } finally {
    setLoading(false);
  }
}

function handleUpdatePage(page: number) {
  searchParams.value.page = page;
  getTableData();
}

function handleUpdatePageSize(size: number) {
  searchParams.value.pageSize = size;
  getTableData();
}

function init() {
  getTableData();
}

onMounted(() => init());
</script>

<style scoped></style>