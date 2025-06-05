<template>
	<n-card>
		<template #header>
			<BaseTitle title="hook" />
		</template>
		<div ref="mapRef" class="h-400px"></div>
	</n-card>
</template>

<script setup lang="ts">
import { useMap } from '@/hooks';
const mapRef = ref<HTMLDivElement>();

const { initMap, createMap } = useMap();

async function init() {
	await initMap();
	createMap(mapRef.value!);
}

onMounted(() => init());
</script>

<style scoped></style>
