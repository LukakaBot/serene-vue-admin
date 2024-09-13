<template>
  <Transition mode="out-in">
    <div class="search-container" :class="{ expand: !isCollapse }">
      <div class="search-wrap">
        <n-form-item label-placement="left" :label="item.label" v-for="(item, index) in list" :key="index">
          <n-input v-model:value="item.value" clearable :placeholder="`请输入${item.label}`" v-if="item.type === 'text'" />
          <n-select v-model:value="item.value" clearable :options="item.options" :placeholder="`请选择${item.label}`"
            :label-field="item.labelField || 'label'" :value-field="item.valueField || 'value'"
            v-if="item.type === 'select'" />
          <n-date-picker class="w-full" v-model:formatted-value="item.value" value-format="yyyy-MM-dd" type="date"
            v-if="item.type === 'date'" />
          <n-date-picker class="w-full" v-model:formatted-value="item.value" value-format="yyyy-MM-dd" type="daterange"
            v-if="item.type === 'daterange'" />
        </n-form-item>
        <div class="btn-wrap">
          <n-button strong type="primary" @click="handleSearch">查询</n-button>
          <n-button strong secondary @click="handleClear">重置</n-button>
          <n-button tertiary v-if="list.length > 4" @click="isCollapse = !isCollapse">
            <BaseIcon class="arrow" :class="{ 'arrow__up': !isCollapse }" name="ep:arrow-down-bold" />
          </n-button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { SearchItem } from './types.d.ts';

type Props = {
  list: SearchItem[];
};

const props = defineProps<Props>();

const emits = defineEmits(['update:search']);

/** 表单类型排除 */
const formTypeExcludes = ['select', 'date', 'dateRange'];

const isCollapse = ref(false);

/** 重置表单值 */
function resetFormData(type: string) {
  return formTypeExcludes.includes(type) ? null : '';
}

/** 搜索查询事件 */
function handleSearch() {
  const params = props.list.reduce((accumulator, current) => {
    return { ...accumulator, [current.key]: current.value };
  }, {} as Record<string, string | null | number | string[]>);

  emits('update:search', params);
}

/** 搜索清空事件 */
function handleClear() {
  props.list.forEach(item => item.value = resetFormData(item.type));

  const params = props.list.reduce((accumulator, current) => {
    return { ...accumulator, [current.key]: resetFormData(current.type) };
  }, {} as Record<string, string | null | number>);

  emits('update:search', params);
}

/** 搜索容器展开状态的高度 */
const expandSearchHeight = computed(() => {
  const searchContainerEle = document.querySelector('.search-container') as HTMLElement;

  if (!searchContainerEle) return '58px';
  searchContainerEle.style.height = 'auto';
  const height = searchContainerEle.offsetHeight;
  searchContainerEle.style.height = '';

  return `${height}px`;
});

defineExpose({ handleSearch, handleClear });
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  overflow: hidden;
  height: 58px;
  transition: height 0.3s cubic-bezier(1, 0.5, 0.8, 1);

  &.expand {
    height: v-bind(expandSearchHeight);
  }
}

.search-wrap {
  display: grid;
  grid-template-columns: repeat(4, 19.33%);
  row-gap: 10px;
  column-gap: 10px;
  position: relative;
}

.btn-wrap {
  display: flex;
  column-gap: 10px;
  position: absolute;
  top: 0;
  right: 0;
}

.arrow {
  transition: transform 0.3s ease-in-out;

  &.arrow__up {
    transform: rotate(180deg);
  }
}
</style>