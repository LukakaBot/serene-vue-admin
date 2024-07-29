<template>
  <n-data-table class="flex-1" :columns="columns" :data="data" :pagination="renderPagination" :bordered="false"
    :loading="loading" flex-height remote @update:page="handleUpdatePage" @update:page-size="handleUpdatePageSize" />
</template>

<script setup lang="ts">
import type { PaginationProps } from 'naive-ui';
import type { RowData } from 'naive-ui/lib/data-table/src/interface';
import type { BaseTableColumn, SearchParams } from './types.d.ts';

type Props = {
  /** 查询参数 */
  searchParams: SearchParams;
  /** 表格列 */
  columns: BaseTableColumn[];
  /** 表格数据 */
  data: RowData[];
  /** 是否显示分页 */
  showPagination?: boolean;
  /** 是否显示 loading 状态 */
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  showPagination: true,
  loading: false,
});

const emits = defineEmits(['update:page', 'update:size']);

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  emits('update:page', page);
}

/** 分页大小更新事件 */
function handleUpdatePageSize(size: number) {
  emits('update:size', size);
}

/** 分页 */
const paginationOptions = computed((): PaginationProps => {
  const page = props.searchParams.page || 1;
  const pageSize = props.searchParams.pageSize || 10;
  const itemCount = props.searchParams.total || 0;

  return {
    page,
    pageSize,
    itemCount,
    // pageCount: 0,
    pageSizes: [10, 20, 30, 40, 50],
    showQuickJumper: true,
    showSizePicker: true,
    prefix: ({ itemCount }) => `共 ${itemCount} 条`,
  };
});

/** 渲染分页 */
const renderPagination = computed(() => props.showPagination ? paginationOptions.value : false);
</script>

<style scoped></style>