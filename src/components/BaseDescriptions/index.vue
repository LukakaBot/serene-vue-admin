<script setup lang="tsx">
import type { CSSProperties } from 'vue';
import type { BaseDescription, BaseDescriptionData } from './types';
import type { DescriptionsProps } from 'naive-ui';

interface Props extends DescriptionsProps {
	/** 描述列表 */
	list: BaseDescription[];
	/** 数据 */
	data: BaseDescriptionData;
	/** 标签样式 */
	itemLabelStyle?: CSSProperties;
	/** 内容样式 */
	itemContentStyle?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
	list: () => [],
	itemLabelStyle: () => ({}),
	itemContentStyle: () => ({}),
});

const attrs = useAttrs();

defineRender(() => {
	const { list, data, itemContentStyle, itemLabelStyle } = props;
	return (
		<n-descriptions {...attrs} bordered={true}>
			{list.map((item, index) => (
				<n-descriptions-item
					key={index}
					label={item.text}
					labelStyle={itemLabelStyle}
					contentStyle={itemContentStyle}
				>
					{item.render ? item.render(data, item.field) : data[item.field]}
				</n-descriptions-item>
			))}
		</n-descriptions>
	);
});
</script>

<style scoped></style>
