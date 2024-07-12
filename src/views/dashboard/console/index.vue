<template>
  <div class="custom-container overflow-y-scroll">
    <DataCard />
    <NavigationCard />
    <ChartCard />
  </div>
</template>

<script setup lang="ts">
import DataCard from './components/DataCard.vue';
import NavigationCard from './components/NavigationCard.vue';
import ChartCard from './components/ChartCard.vue';
</script>

<style scoped>
.custom-container {
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 8px 12px;
  height: calc(100% - 20px);
  border-radius: 4px;
}
</style>