<script setup lang="tsx">
import type { ToolbarNames } from 'md-editor-v3';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

interface Props {
	value: string;
	/** 是否展示预览 */
	preview?: boolean;
	/** 工具栏 */
	toolbars?: ToolbarNames[];
	/** 内容更新时触发 */
	'onUpdate:value'?: (value: string) => void;
	onUpdateValue?: (value: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
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
	props['onUpdate:value']?.(value);
	props.onUpdateValue?.(value);
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
