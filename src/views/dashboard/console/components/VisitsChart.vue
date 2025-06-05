<template>
	<div class="h-400px">
		<div ref="chartRef" class="h-400px"></div>
	</div>
</template>

<script setup lang="ts">
import useECharts from '@/hooks/echarts/useECharts';

type Props = {
	/** 图表宽度 */
	width?: string;
	/** 图表高度 */
	height?: string;
};

withDefaults(defineProps<Props>(), {
	width: '100%',
	height: '300px',
});

const chartRef = ref<HTMLDivElement | null>(null);

const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

function initChartOption() {
	setOptions({
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				lineStyle: {
					width: 1,
					color: '#019680',
				},
			},
		},
		grid: {
			left: '1%',
			right: '1%',
			top: '2  %',
			bottom: 0,
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: [
				'1月',
				'2月',
				'3月',
				'4月',
				'5月',
				'6月',
				'7月',
				'8月',
				'9月',
				'10月',
				'11月',
				'12月',
			],
		},
		yAxis: {
			type: 'value',
			max: 8000,
			splitNumber: 4,
		},
		series: [
			{
				data: [
					3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000,
					3200, 4800,
				],
				type: 'bar',
				barMaxWidth: 80,
			},
		],
	});
}

/** 初始化 */
function init() {
	initChartOption();
}

onMounted(() => init());
</script>

<style scoped></style>
