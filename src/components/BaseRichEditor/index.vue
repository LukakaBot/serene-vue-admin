<script setup lang="tsx">
import type { CSSProperties } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import type {
	IDomEditor,
	IEditorConfig,
	IToolbarConfig,
} from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { isNumber } from '@/utils/is';

interface Props {
	value: string;
	width: string | number;
	height: string | number;
	borderColor?: string;
	/** body 样式 */
	bodyStyle?: CSSProperties;
	/** 编辑器样式 */
	editorStyle?: CSSProperties;
	mode: 'simple' | 'default';
	/** 工具栏配置 */
	toolbarConfig: Partial<IToolbarConfig>;
	/** 编辑器配置 */
	editorConfig: Partial<IEditorConfig>;
	/** 编辑器内容变化时触发 */
	'onUpdate:value'?: (value: string) => void;
	/** 编辑器内容变化时触发 */
	onUpdateValue?: (value: string) => void;
	/** 编辑器创建完毕时触发 */
	onCreated?: (editor: IDomEditor) => void;
	/** 编辑器内容、选区变化时触发 */
	onChange?: (editor: IDomEditor) => void;
	/** 编辑器销毁时触发 */
	onDestroyed?: () => void;
	/** 编辑器聚焦时触发 */
	onFocus?: (editor: IDomEditor) => void;
	/** 编辑器失焦时触发 */
	onBlur?: (editor: IDomEditor) => void;
}

const props = withDefaults(defineProps<Props>(), {
	width: '100%',
	height: '100%',
	borderColor: '#e0e0e6',
	bodyStyle: () => ({}),
	editorStyle: () => ({}),
	mode: 'default',
	toolbarConfig: () => ({}),
	editorConfig: () => ({}),
});

const editorRef = shallowRef<IDomEditor>();

const bodyStyle = computed<CSSProperties>(() => {
	return {
		border: `1px solid ${props.borderColor}`,
		borderRadius: '4px',
		...props.bodyStyle,
	};
});

const editorStyle = computed<CSSProperties>(() => {
	const width = isNumber(props.width) ? `${props.width}px` : props.width;
	const height = isNumber(props.height) ? `${props.height}px` : props.height;
	return {
		width,
		height,
		overflow: 'hidden',
	};
});

function handleCreated(editor: IDomEditor) {
	editorRef.value = editor;
	props.onCreated?.(editor);
}

function handleUpdateValue(value: string) {
	props.onUpdateValue?.(value);
	props['onUpdate:value']?.(value);
}

defineRender(() => {
	const {
		value,
		mode,
		toolbarConfig,
		editorConfig,
		onChange,
		onDestroyed,
		onFocus,
		onBlur,
	} = props;

	return (
		<div style={bodyStyle.value}>
			<Toolbar
				style='border-bottom: 1px solid #ccc'
				editor={editorRef}
				defaultConfig={toolbarConfig}
				mode={mode}
			/>
			<Editor
				style={editorStyle.value}
				modelValue={value}
				defaultConfig={editorConfig}
				mode={mode}
				onCreated={handleCreated}
				onUpdateModelValue={handleUpdateValue}
				onChange={onChange}
				onDestroyed={onDestroyed}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</div>
	);
});
</script>

<style scoped></style>
