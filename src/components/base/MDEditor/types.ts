import type { ToolbarNames } from 'md-editor-v3'

export interface MDEditorProps {
  'value': string
  /** 是否展示预览 */
  'preview'?: boolean
  /** 工具栏 */
  'toolbars'?: ToolbarNames[]
  /** 内容更新时触发 */
  'onUpdate:value'?: (value: string) => void
  /** 内容更新时触发 */
  'onUpdateValue'?: (value: string) => void
}
