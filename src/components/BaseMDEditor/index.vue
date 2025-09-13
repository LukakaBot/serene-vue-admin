<script setup lang="tsx">
import type { BaseMDEditorProps } from './types'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const props = withDefaults(defineProps<BaseMDEditorProps>(), {
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
})

const text = ref('')

function handleUpdateValue(value: string) {
  props['onUpdate:value']?.(value)
  props.onUpdateValue?.(value)
}

defineRender(() => (
  <MdEditor
    v-model={text}
    toolbars={props.toolbars}
    preview={props.preview}
    onUpdate:modelValue={handleUpdateValue}
  />
))
</script>

<style scoped></style>
