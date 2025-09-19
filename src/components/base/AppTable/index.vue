<script setup lang="ts">
import type { ButtonProps, DataTableRowKey, PaginationProps } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import type {
  AppTableColumn,
  AppTableColumns,
  AppTableProps,
  Operations,
} from './types.ts'
import { NDataTable, NFlex, NPopover } from 'naive-ui'
import { resolveDirective, withDirectives } from 'vue'
import { renderButton, renderIcon } from '@/utils/tools'

const props = withDefaults(defineProps<AppTableProps>(), {
  checkedRowKeys: () => [],
  showPagination: true,
  loading: false,
  operations: () => [],
  rowKey: () => (row: RowData) => row.id,
  maxHeight: undefined,
})

/** 表格列 */
const tableColumns = computed(() => {
  const operationColumn = renderOperationColumn(props.operations)
  return [...props.columns, ...operationColumn]
})

/** 分页 */
const paginationOptions = computed<PaginationProps>(() => {
  const page = props.searchParams.page ?? 1
  const pageSize = props.searchParams.pageSize ?? 10
  const itemCount = props.searchParams.total ?? 0

  return {
    page,
    pageSize,
    itemCount,
    pageSizes: [10, 30, 50, 100, 200],
    showQuickJumper: true,
    showSizePicker: true,
    prefix: ({ itemCount }) => `共 ${itemCount} 条`,
  }
})

/** 分页 */
const pagination = computed(
  () => !!props.showPagination && paginationOptions.value,
)

/** 表格操作列宽度 */
const operationColumnWidth = computed(() => {
  const length = props.operations.length
  const width
    = length < 3
      ? props.operations.reduce((acc, cur) => {
          const hanziLength = cur.text.length
          return acc + hanziLength * 50
        }, 0)
      : 116

  return width
})

/** 表格内容的横向宽度 */
const scrollX = computed(() => {
  if (props.columns.length === 0)
    return 0
  const fixedLeftColumnsWidth = props.columns.reduce(
    (acc, cur) =>
      acc + (cur.fixed === 'left' ? (cur.width ? Number(cur.width) : 0) : 0),
    0,
  )
  const columnsWidth = props.columns.reduce(calculateTableWidth, 0)
  const fixedRightColumnsWidth = operationColumnWidth.value

  return fixedLeftColumnsWidth + columnsWidth + fixedRightColumnsWidth
})

/** update checked-row-keys */
function handleUpdateCheckedRowKeys(keys: DataTableRowKey[]) {
  props.onUpdateCheckedRowKeys?.(keys)
  props['onUpdate:checkedRowKeys']?.(keys)
}

/** update page */
function handleUpdatePage(page: number) {
  props.onUpdatePage?.(page)
  props['onUpdate:page']?.(page)
}

/** update page-size */
function handleUpdatePageSize(size: number) {
  props.onUpdatePageSize?.(size)
  props['onUpdate:pageSize']?.(size)
}

/** 计算表格宽度 */
function calculateTableWidth(acc: number, cur: AppTableColumn): number {
  const childrenColumnWidth = cur.children?.reduce(calculateTableWidth, 0) ?? 0
  const columnWidth = !cur.children?.length && cur.width ? Number(cur.width) : 0

  return acc + childrenColumnWidth + columnWidth
}

/** 渲染操作列按钮 */
function renderOperationColumnButtons(
  operations: Operations,
  row: RowData,
  index: number,
) {
  const { onAction } = props
  return operations.map((operation) => {
    const props: ButtonProps = {
      size: 'small',
      type: operation?.type ?? 'default',
      disabled: operation?.disabled?.(row, index) ?? false,
      renderIcon: operation.icon
        ? () => renderIcon({ name: operation.icon as string })
        : undefined,
      onClick: () => onAction?.(operation.text, row, index),
    }
    const render = renderButton(props, () => operation.text)

    if (operation?.auth) {
      const authDirective = resolveDirective('auth')
      return withDirectives(render, [[authDirective, operation.text]])
    }

    return render
  })
}

/** 渲染操作列 */
function renderOperationColumn(operations: Operations): AppTableColumns {
  const newOperationColumn: AppTableColumn = {
    title: '操作',
    align: 'center',
    key: 'operations',
    fixed: 'right',
    width: operationColumnWidth.value,
  }
  if (!operations || operations.length <= 0)
    return []

  newOperationColumn.render = (row, index) => {
    if (operations.length > 2) {
      return h(
        NPopover,
        { trigger: 'click', placement: 'bottom' },
        {
          trigger: () =>
            renderButton(
              {
                type: 'info',
                size: 'small',
                iconPlacement: 'right',
                renderIcon: () => renderIcon({ name: 'ep:arrow-down' }),
              },
              () => '更多',
            ),
          default: () =>
            h(NFlex, { vertical: true, justify: 'center' }, () =>
              renderOperationColumnButtons(operations, row, index)),
        },
      )
    }
    return h(NFlex, { justify: 'center' }, () =>
      renderOperationColumnButtons(operations, row, index))
  }

  return [newOperationColumn]
}
</script>

<template>
  <NDataTable
    flex="1"
    class="flex-1"
    :columns="tableColumns"
    :checked-row-keys="checkedRowKeys"
    :data="data"
    :scroll-x="scrollX"
    :pagination="pagination"
    :single-line="false"
    :loading="loading"
    :max-height="maxHeight"
    :flex-height="true"
    remote
    striped
    :row-key="rowKey"
    :on-update-checked-row-keys="handleUpdateCheckedRowKeys"
    :on-update-page="handleUpdatePage"
    :on-update-page-size="handleUpdatePageSize"
  />
</template>

<style scoped></style>
