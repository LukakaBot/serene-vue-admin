<script setup lang="ts">
import { useMap } from '@/hooks'

const mapRef = ref<HTMLDivElement>()

const { initMap, createMap } = useMap()

async function init() {
  await initMap()
  createMap(mapRef.value!)
}

onMounted(() => init())
</script>

<template>
  <n-card>
    <template #header>
      <TagTitle title="hook" />
    </template>
    <div ref="mapRef" class="h-400px" />
  </n-card>
</template>

<style scoped></style>
