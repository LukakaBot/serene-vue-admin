<script setup lang="ts">
import ChartCard from './components/ChartCard.vue'
import DataCard from './components/DataCard.vue'
import NavigationCard from './components/NavigationCard.vue'
</script>

<template>
  <div class="custom-container">
    <DataCard />
    <NavigationCard />
    <ChartCard />
  </div>
</template>

<style scoped>
.custom-container {
  display: flex;
  flex-direction: column;
  margin: 0 10px 10px;
  height: calc(100% - 20px);
  border-radius: 4px;
  overflow-y: scroll;
}
</style>
