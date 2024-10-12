<template>
  <n-descriptions v-bind="attrs">
    <n-descriptions-item :label="item.text" :label-style="itemLabelStyle" :content-style="itemContentStyle"
      v-for="(item, index) in list" :key="index">
      <RenderDescription :data="data" :render="item.render" v-if="item?.render" />
      <div v-else>{{ data[item.field] }}</div>
    </n-descriptions-item>
  </n-descriptions>
</template>

<script setup lang="ts">
import type { BaseDescription, DescriptionData } from './types';
import RenderDescription from './components/RenderDescription.vue';

type Props = {
  /** 描述列表 */
  list: BaseDescription[];
  /** 数据 */
  data: DescriptionData;
  /** 标签样式 */
  itemLabelStyle: Record<string, string>;
  /** 内容样式 */
  itemContentStyle: Record<string, string>;
};

withDefaults(defineProps<Props>(), {
  list: () => []
});

const attrs = useAttrs();
</script>

<style scoped></style>