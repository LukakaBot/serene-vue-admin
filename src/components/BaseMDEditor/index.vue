<script setup lang="tsx">
import type { ToolbarNames } from 'md-editor-v3';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

interface IProps {
	value: string;
	/** 是否展示预览 */
	preview?: boolean;
	/** 工具栏 */
	toolbars?: ToolbarNames[];
	'onUpdate:value'?: (value: string) => void;
	onUpdateValue?: (value: string) => void;
}

const props = withDefaults(defineProps<IProps>(), {
	preview: false,
	toolbars: () => [
		'bold',
		'underline',
		'italic',
		'-',
		'title',
		'strikeThrough',
		'sub',
		'sup',
		'quote',
		'unorderedList',
		'orderedList',
		'task',
		'-',
		'codeRow',
		'code',
		'link',
		'image',
		'table',
		'mermaid',
		'katex',
		'-',
		'revoke',
		'next',
		'=',
		'pageFullscreen',
		'fullscreen',
		'preview',
		'previewOnly',
		'htmlPreview',
		'catalog',
	],
});

const text = ref('');

function handleUpdateValue(value: string) {
	const { onUpdateValue, 'onUpdate:value': onUpdateValue2 } = props;

	onUpdateValue && onUpdateValue(value);
	onUpdateValue2 && onUpdateValue2(value);
}

defineRender(() => (
	<MdEditor
		v-model={text}
		toolbars={props.toolbars}
		preview={props.preview}
		onUpdate:modelValue={handleUpdateValue}
	/>
));
</script>

<style scoped></style>
