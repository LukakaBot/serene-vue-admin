<template>
  <n-card class="overflow-hidden" content-style="padding: 0;" :bordered="false">
    <n-tabs type="line" animated :tabs-padding="20" pane-style="padding: 20px;">
      <n-tab-pane :name="item.name" :tab="item.tab" v-for="(item, index) in tabList" :key="index">
        <component :is="item.component" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import TrendChart from './TrendChart.vue';
import VisitsChart from './VisitsChart.vue';

const tabList = ref([
  { name: 'trend', tab: '流量趋势', component: shallowRef(TrendChart) },
  { name: 'visits', tab: '访问量', component: shallowRef(VisitsChart) },
]);
</script>

<style scoped></style>