<template>
  <n-descriptions v-bind="attrs">
    <n-descriptions-item :label="item.text" :label-style="itemLabelStyle" :content-style="itemContentStyle"
      v-for="(item, index) in list" :key="index">
      <DescriptionsItemRender :data="data" :field="item.field" :render="item.render" v-if="item?.render" />
      <div v-else>{{ data[item.field] }}</div>
    </n-descriptions-item>
  </n-descriptions>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { BaseDescription, BaseDescriptionData } from './types';
import DescriptionsItemRender from './components/DescriptionsItemRender.vue';

type Props = {
  /** 描述列表 */
  list: BaseDescription[];
  /** 数据 */
  data: BaseDescriptionData;
  /** 标签样式 */
  itemLabelStyle: CSSProperties;
  /** 内容样式 */
  itemContentStyle: CSSProperties;
};

withDefaults(defineProps<Props>(), {
  list: () => []
});

const attrs = useAttrs();
</script>

<style scoped></style>