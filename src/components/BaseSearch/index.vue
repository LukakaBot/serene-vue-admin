<script setup lang="tsx">
import { Transition } from 'vue';
import type { SearchParams, SearchItem } from './types.d.ts';
import BaseIcon from '@/components/BaseIcon/index.vue';

type Props = {
	list: SearchItem[];
	/** 搜索时触发 */
	'onUpdate:search'?: (params: SearchParams) => void;
	onUpdateSearch?: (params: SearchParams) => void;
};

const props = defineProps<Props>();

/** 表单类型排除 */
const formTypeExcludes = ['select', 'date', 'dateRange'];

/** 是否折叠 */
const isCollapse = ref(true);

/** 重置表单值 */
function resetFormData(type: string) {
	return formTypeExcludes.includes(type) ? null : '';
}

/** 搜索查询事件 */
function handleSearch() {
	const params = props.list.reduce(
		(accumulator, current) => ({
			...accumulator,
			[current.key]: current.value,
		}),
		{} as SearchParams
	);

	props['onUpdate:search']?.(params);
	props.onUpdateSearch?.(params);
}

/** 搜索清空事件 */
function handleClear() {
	props.list.forEach((item) => (item.value = resetFormData(item.type)));

	const params = props.list.reduce(
		(accumulator, current) => ({
			...accumulator,
			[current.key]: resetFormData(current.type),
		}),
		{} as SearchParams
	);

	props['onUpdate:search']?.(params);
	props.onUpdateSearch?.(params);
}

/** 搜索容器展开状态的高度 */
const expandSearchHeight = computed(() => {
	const searchContainerEle = document.querySelector(
		'.search-container'
	) as HTMLElement;

	if (!searchContainerEle) return '58px';
	searchContainerEle.style.height = 'auto';
	const height = searchContainerEle.offsetHeight;
	searchContainerEle.style.height = '';

	return `${height}px`;
});

defineExpose({ handleSearch, handleClear });

defineRender(() => (
	<Transition mode='out-in'>
		<div class={`search-container ${!isCollapse.value ? 'expand' : ''}`}>
			<div class='search-wrap'>
				{props.list.map((item, index) => (
					<n-form-item label-placement='left' label={item.label} key={index}>
						{/* 文本输入 */}
						<n-input
							v-model:value={item.value}
							v-if={item.type === 'text'}
							placeholder={`请输入${item.label}`}
							clearable
						/>
						{/* 下拉选择 */}
						<n-select
							v-model:value={item.value}
							v-if={item.type === 'select'}
							options={item.options}
							placeholder={`请选择${item.label}`}
							value-field={item.valueField}
							label-field={item.labelField}
							filterable={item.filterable}
							virtual-scroll={item.virtualScroll}
							clearable
						/>
						{/* 日期选择 */}
						<n-date-picker
							class='w-full'
							v-model:formatted-value={item.value}
							v-if={item.type === 'date'}
							value-format={item.valueFormat || 'yyyy-MM-dd'}
							is-date-disabled={item.dateDisabled}
							type='date'
							clearable
						/>
						{/* 日期范围选择 */}
						<n-date-picker
							class='w-full'
							v-model:formatted-value={item.value}
							v-if={item.type === 'daterange'}
							value-format={item.valueFormat || 'yyyy-MM-dd'}
							is-date-disabled={item.dateDisabled}
							type='daterange'
							clearable
						/>
					</n-form-item>
				))}
				<n-flex class='absolute top-0 right-0'>
					<n-button strong type='primary' onClick={handleSearch}>
						查询
					</n-button>
					<n-button strong secondary onClick={handleClear}>
						重置
					</n-button>
					<n-button
						tertiary
						v-if={props.list.length > 4}
						onClick={() => (isCollapse.value = !isCollapse.value)}
					>
						<BaseIcon
							class={`arrow ${!isCollapse.value ? 'arrow__up' : ''}`}
							name='ep:arrow-down-bold'
						/>
					</n-button>
				</n-flex>
			</div>
		</div>
	</Transition>
));
</script>

<style scoped>
.search-container {
	position: relative;
	overflow: hidden;
	height: 58px;
	transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-container.expand {
	height: v-bind(expandSearchHeight);
}

.search-wrap {
	display: grid;
	grid-template-columns: repeat(4, 19.33%);
	row-gap: 10px;
	column-gap: 10px;
	position: relative;
}

.arrow {
	transition: transform 0.3s ease-in-out;
}

.arrow.arrow__up {
	transform: rotate(180deg);
}
</style>
