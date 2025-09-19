<script setup lang="tsx">
import type { AppSearchProps, SearchParams } from './types.ts'
import AppIcon from '@/components/base/AppIcon/index.vue'

const props = defineProps<AppSearchProps>()

/** 表单类型排除 */
const formTypeExcludes = ['select', 'date', 'dateRange']

const searchContainerRef = ref<HTMLDivElement>()

/** 是否折叠 */
const isCollapse = ref(true)

/** 重置表单值 */
function resetFormData(type: string) {
  return formTypeExcludes.includes(type) ? null : ''
}

/** 搜索查询事件 */
function handleSearch() {
  const params = props.list.reduce(
    (accumulator, current) => ({
      ...accumulator,
      [current.key]: current.value,
    }),
    {} as SearchParams,
  )

  props['onUpdate:search']?.(params)
  props.onUpdateSearch?.(params)
}

/** 搜索清空事件 */
function handleClear() {
  props.list.forEach(item => (item.value = resetFormData(item.type)))

  const params = props.list.reduce(
    (accumulator, current) => ({
      ...accumulator,
      [current.key]: resetFormData(current.type),
    }),
    {} as SearchParams,
  )

  props['onUpdate:search']?.(params)
  props.onUpdateSearch?.(params)
}

/** 搜索容器展开/收起状态的高度 */
watch(isCollapse, (v) => {
  if (!searchContainerRef.value)
    return
  searchContainerRef.value.style.height = 'auto'
  const expandHeight = searchContainerRef.value.offsetHeight
  searchContainerRef.value.style.height = v ? '58px' : `${expandHeight}px`
})

defineExpose({ handleSearch, handleClear })
</script>

<template>
  <div
    ref="searchContainerRef"
    :class="`search-container ${!isCollapse ? 'expand' : ''}`"
  >
    <div class="search-wrap">
      <n-form-item
        v-for="(item, index) in list"
        :key="index"
        label-placement="left"
        :label="item.label"
      >
        <!-- 文本输入 -->
        <n-input
          v-if="item.type === 'text'"
          v-model:value="item.value"
          :placeholder="`请输入${item.label}`"
          clearable
        />
        <!-- 下拉选择 -->
        <n-select
          v-if="item.type === 'select'"
          v-model:value="item.value"
          :options="item.options"
          :placeholder="`请选择${item.label}`"
          :value-field="item.valueField"
          :label-field="item.labelField"
          :filterable="item.filterable"
          :virtual-scroll="item.virtualScroll"
          clearable
        />
        <!-- 日期选择 -->
        <n-date-picker
          v-if="item.type === 'date'"
          v-model:formatted-value="item.value"
          class="w-full"
          :value-format="item.valueFormat || 'yyyy-MM-dd'"
          :is-date-disabled="item.dateDisabled"
          type="date"
          clearable
        />
        <!-- 日期范围选择 -->
        <n-date-picker
          v-if="item.type === 'daterange'"
          v-model:formatted-value="item.value"
          class="w-full"
          :value-format="item.valueFormat || 'yyyy-MM-dd'"
          :is-date-disabled="item.dateDisabled"
          type="daterange"
          clearable
        />
      </n-form-item>
      <n-flex class="absolute right-0 top-0">
        <n-button strong type="primary" @click="handleSearch">
          查询
        </n-button>
        <n-button strong secondary @click="handleClear">
          重置
        </n-button>
        <n-button
          v-if="props.list.length > 4"
          tertiary
          @click="() => (isCollapse = !isCollapse)"
        >
          <AppIcon
            :class="`arrow ${!isCollapse ? 'arrow__up' : ''}`"
            name="ep:arrow-down-bold"
          />
        </n-button>
      </n-flex>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  overflow: hidden;
  height: 58px;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-wrap {
  display: grid;
  grid-template-columns: repeat(4, 19.33%);
  row-gap: 10px;
  column-gap: 10px;
  position: relative;
}

.arrow {
  transition: transform 0.3s ease-in-out;
}

.arrow.arrow__up {
  transform: rotate(180deg);
}
</style>
