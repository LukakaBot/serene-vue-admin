<script setup lang="ts">
import DataTable from './components/DataTable.vue'
import OperationTable from './components/OperationTable.vue'
import SelectTable from './components/SelectTable.vue'

const currentTab = ref('基础表格')

const tabs = [
  { name: '基础表格', tab: '基础表格', component: DataTable },
  { name: '操作列', tab: '操作列', component: OperationTable },
  { name: '选中行', tab: '选中行', component: SelectTable },
]

const component = computed(() => tabs.find(tab => tab.name === currentTab.value)?.component)
</script>

<template>
  <div class="base-container">
    <n-tabs v-model:value="currentTab" type="line" animated>
      <n-tab v-for="tab in tabs" :key="tab.name" :name="tab.name" />
    </n-tabs>
    <component :is="component" />
  </div>
</template>

<style scoped></style>
