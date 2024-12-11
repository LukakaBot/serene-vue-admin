<template>
  <div class="base-container">
    <n-tabs v-model:value="currentTab" type="line" animated>
      <n-tab :name="tab.name" v-for="tab in tabs" :key="tab.name" />
    </n-tabs>
    <component :is="component" />
  </div>
</template>

<script setup lang="ts">
import DataTable from './components/DataTable.vue';
import OperationTable from './components/OperationTable.vue';

const currentTab = ref('基础表格');

const tabs = [
  { name: '基础表格', tab: '基础表格', component: DataTable },
  { name: '操作表格', tab: '操作表格', component: OperationTable },
];

const component = computed(() => tabs.find((tab) => tab.name === currentTab.value)?.component);

watchEffect(() => {
  console.log(currentTab.value)
})
</script>

<style scoped></style>