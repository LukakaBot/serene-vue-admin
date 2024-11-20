<template>
  <n-data-table class="flex-1" :columns="tableColumns" :checked-row-keys="checkedRowKeys" :data="data"
    :scroll-x="scrollX" :pagination="pagination" :single-line="false" :loading="loading" flex-height remote
    :row-key="rowKey" @update:checked-row-keys="handleUpdateCheckedRowKeys" @update:page="handleUpdatePage"
    @update:page-size="handleUpdatePageSize" />
</template>

<script setup lang="ts">
import { NFlex, NPopover, type PaginationProps } from 'naive-ui';
import type { RowData } from 'naive-ui/lib/data-table/src/interface';
import type { Operation, BaseTableColumn, SearchParams } from './types.d.ts';
import { renderIcon, renderButton } from '@/utils/tools';

type Props = {
  /** 查询参数 */
  searchParams: SearchParams;
  /** 表格列 */
  columns: BaseTableColumn[];
  /** 表格数据 */
  data: RowData[];
  /** 表格选中项 */
  checkedRowKeys?: Array<number | string>;
  /** 是否显示分页 */
  showPagination?: boolean;
  /** 是否显示 loading 状态 */
  loading?: boolean;
  /** 表格操作按钮 */
  operations?: Operation[];
  /** 表格行的 key */
  rowKey?: (rowData: RowData) => (number | string);
};

type Emits = {
  (event: 'update:page', page: number): void;
  (event: 'update:page-size', size: number): void;
  (event: 'update:checked-row-keys', keys: Array<number | string>): void;
  (event: 'operate', label: string, row: RowData): void;
};

const props = withDefaults(defineProps<Props>(), {
  checkedRowKeys: () => [],
  showPagination: true,
  loading: false,
  operations: () => [],
  rowKey: (row: RowData) => row.id,
});

const emits = defineEmits<Emits>();

/** checked-row-keys 值更新事件 */
function handleUpdateCheckedRowKeys(keys: Array<number | string>) {
  emits('update:checked-row-keys', keys);
}

/** 分页更新事件 */
function handleUpdatePage(page: number) {
  emits('update:page', page);
}

/** 分页大小更新事件 */
function handleUpdatePageSize(size: number) {
  emits('update:page-size', size);
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
    pageSizes: [10, 20, 30, 40, 50],
    showQuickJumper: true,
    showSizePicker: true,
    prefix: ({ itemCount }) => `共 ${itemCount} 条`,
  };
});

/** 计算表格宽度 */
function calculateTableWidth(acc: number, cur: BaseTableColumn): number {
  if (cur.children) {
    return cur.children.reduce(calculateTableWidth, 0);
  }
  return acc + (cur.width ? Number(cur.width) : 0);
}

/** 渲染操作列按钮 */
function renderOperationColumnButtons(operations: Operation[], row: RowData) {
  return operations.map(operation => renderButton({
    size: 'small',
    type: operation.type,
    disabled: operation?.disabled ? operation.disabled(row) : false,
    renderIcon: renderIcon({ name: operation.icon as string }),
    onClick: () => emits('operate', operation.label, row)
  }, () => operation.label));
}


/** 渲染操作列 */
function renderOperationColumn(operations: Operation[]): BaseTableColumn[] {
  let newOperationColumn: BaseTableColumn = { title: '操作', align: 'center', key: 'operations', fixed: 'right', width: operationColumnWidth.value };
  if (!operations || operations.length <= 0) return [newOperationColumn];

  newOperationColumn.render = (row) => {
    if (operations.length > 2) {
      return h(NPopover, { trigger: 'hover', placement: 'bottom' }, {
        trigger: () => renderButton({ type: 'info', size: 'small', iconPlacement: 'right', renderIcon: renderIcon({ name: 'ep:arrow-down' }) }, () => '更多'),
        default: () => h(NFlex, { vertical: true, justify: 'center' }, () => renderOperationColumnButtons(operations, row))
      });
    }
    return h(NFlex, { justify: 'center' }, () => renderOperationColumnButtons(operations, row));
  };

  return [newOperationColumn];
}

/** 表格列 */
const tableColumns = computed(() => {
  const operationColumn = renderOperationColumn(props.operations);
  const newColumns = [...props.columns, ...operationColumn];
  return newColumns;
});

/** 分页 */
const pagination = computed(() => props.showPagination ? paginationOptions.value : false);

/** 表格操作列宽度 */
const operationColumnWidth = computed(() => {
  const length = props.operations.length;
  const width = length < 3
    ? props.operations.reduce((acc, cur) => {
      const hanziLength = cur.label.length;
      return acc + hanziLength * 50;
    }, 0)
    : 116;

  return width;
});

/** 表格内容的横向宽度 */
const scrollX = computed(() => {
  if (props.columns.length === 0) return 0;
  const columnsWidth = props.columns.reduce(calculateTableWidth, 0);
  const fixedLeftColumnsWidth = props.columns.reduce((acc, cur) => acc + (cur.fixed === 'left' ? (cur.width ? Number(cur.width) : 0) : 0), 0);
  const fixedRightColumnsWidth = operationColumnWidth.value;

  return columnsWidth + fixedLeftColumnsWidth + fixedRightColumnsWidth;
});
</script>

<style scoped></style>