<script setup lang="tsx">
import type { DescriptionsProps } from 'naive-ui'
import type { CSSProperties } from 'vue'
import type { AppDescription, DescriptionData } from './types'

interface Props extends DescriptionsProps {
  /** 描述列表 */
  list: AppDescription[]
  /** 数据 */
  data: DescriptionData
  /** 标签样式 */
  itemLabelStyle?: CSSProperties
  /** 内容样式 */
  itemContentStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
  itemLabelStyle: () => ({}),
  itemContentStyle: () => ({}),
})

const attrs = useAttrs()

defineRender(() => {
  const { list, data, itemContentStyle, itemLabelStyle } = props
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
  )
})
</script>

<style scoped></style>
