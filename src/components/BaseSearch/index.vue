
import { emit } from 'process';
<template>
  <div class="search-container">
    <div class="search-wrap">
      <div class="search-item" v-for="(item, index) in list" :key="index">
        <span class="search-item__label">{{ item.label }}</span>
        <div class="search-item__value">
          <!-- 文本输入框 -->
          <n-input v-model:value="item.value" :placeholder="`请输入${item.label}`" clearable v-if="item.type === 'text'" />
          <!-- 文本域输入框 -->
          <n-input v-model:value="item.value" :placeholder="`请输入${item.label}`" clearable type="textarea"
            :show-count="true" v-if="item.type === 'textarea'" />
          <!-- 下拉选择 -->
          <n-select v-model:value="item.value" :placeholder="`请选择${item.label}`" :options="item.options"
            v-if="item.type === 'select'" :value-field="item.valueField" :label-field="item.labelField" clearable />
          <!-- 日期时间选择 -->
          <n-date-picker class="w-full" v-model:formatted-value="item.value" :placeholder="`请选择${item.label}`" clearable
            value-format="yyyy-MM-dd" type="date" v-if="item.type === 'date'" />
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <el-button size="mini" class="wh-fr" type="primary" @click="handleSearch">查询</el-button>
      <el-button size="mini" :style="{ 'margin-right': '10px' }" class="wh-fr" @click="handleClear">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchItem } from './types.d.ts';

type Props = {
  list: SearchItem[];
};

const props = defineProps<Props>();

const emits = defineEmits(['update:clearSearch', 'update:paramsSearch']);

/** 搜索清空事件 */
function handleClear() {
  props.list.forEach(item => item.value = ['select', 'date', 'dateRange'].includes(item.type) ? null : '');

  const params = props.list.reduce((accumulator, current) => {
    accumulator[current.key] = '';
    return accumulator;
  }, {} as Record<string, string | null | number>);

  emits('update:clearSearch', params);
}

/** 搜索查询事件 */
function handleSearch() {
  const params = props.list.reduce((accumulator, current) => {
    accumulator[current.key] = current.value;
    return accumulator;
  }, {} as Record<string, string | null | number | string[]>);

  emits('update:paramsSearch', params);
}

defineExpose({ handleClear, handleSearch });
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  position: relative;
  /* height: 46px; */
}

.search-wrap {
  display: grid;
  grid-template-columns: repeat(5, 19.33%);
  row-gap: 10px;
  column-gap: 10px;
  width: 90%;
  height: 100%;
}

.search-item {
  display: flex;
  width: 100%;
  align-items: center;
}

.search-item__label {
  white-space: nowrap;
  overflow: hidden;
  padding-right: 10px;
}

.search-item__value {
  flex: 1;
}

.btn-wrap {
  position: absolute;
  top: 4px;
  right: 0;
  width: 160px;
}
</style>