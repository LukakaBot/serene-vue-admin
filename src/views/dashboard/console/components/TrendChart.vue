<script setup lang="tsx">
import { useECharts } from '@/hooks';

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

const chartRef = ref<HTMLDivElement>();

const { setOptions } = useECharts(chartRef);

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
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: [
				'6:00',
				'7:00',
				'8:00',
				'9:00',
				'10:00',
				'11:00',
				'12:00',
				'13:00',
				'14:00',
				'15:00',
				'16:00',
				'17:00',
				'18:00',
				'19:00',
				'20:00',
				'21:00',
				'22:00',
				'23:00',
			],
			splitLine: {
				show: true,
				lineStyle: {
					width: 1,
					type: 'solid',
					color: 'rgba(226,226,226,0.5)',
				},
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: [
			{
				type: 'value',
				max: 80000,
				splitNumber: 4,
				axisTick: {
					show: false,
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
					},
				},
			},
		],
		grid: {
			left: '1%',
			right: '1%',
			top: '2  %',
			bottom: 0,
			containLabel: true,
		},
		series: [
			{
				smooth: true,
				data: [
					111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000,
					66666, 44444, 22222, 11111, 4000, 2000, 500, 333, 222, 111,
				],
				type: 'line',
				areaStyle: {},
				itemStyle: {
					color: '#5ab1ef',
				},
			},
			{
				smooth: true,
				data: [
					33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000,
					2221, 1201, 390, 198, 60, 30, 22, 11,
				],
				type: 'line',
				areaStyle: {},
				itemStyle: {
					color: '#019680',
				},
			},
		],
	});
}

/** 初始化 */
function init() {
	initChartOption();
}

onMounted(() => init());

defineRender(() => {
	return (
		<div class='h-400px'>
			<div ref='chartRef' class='h-400px'></div>
		</div>
	);
});
</script>

<style scoped></style>
