import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor'
import type { CSSProperties } from 'vue'

export interface BaseRichEditorProps {
  'value': string
  'width': string | number
  'height': string | number
  'borderColor'?: string
  /** body 样式 */
  'bodyStyle'?: CSSProperties
  /** 编辑器样式 */
  'editorStyle'?: CSSProperties
  'mode': 'simple' | 'default'
  /** 工具栏配置 */
  'toolbarConfig': Partial<IToolbarConfig>
  /** 编辑器配置 */
  'editorConfig': Partial<IEditorConfig>
  /** 编辑器内容变化时触发 */
  'onUpdate:value'?: (value: string) => void
  /** 编辑器内容变化时触发 */
  'onUpdateValue'?: (value: string) => void
  /** 编辑器创建完毕时触发 */
  'onCreated'?: (editor: IDomEditor) => void
  /** 编辑器内容、选区变化时触发 */
  'onChange'?: (editor: IDomEditor) => void
  /** 编辑器销毁时触发 */
  'onDestroyed'?: () => void
  /** 编辑器聚焦时触发 */
  'onFocus'?: (editor: IDomEditor) => void
  /** 编辑器失焦时触发 */
  'onBlur'?: (editor: IDomEditor) => void
}
