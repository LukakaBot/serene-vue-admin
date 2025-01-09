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
};

const props = withDefaults(
  defineProps<Props>(),
  {
    list: () => [],
    itemLabelStyle: () => ({}),
    itemContentStyle: () => ({}),
  }
);

const attrs = useAttrs();

defineRender(() => (
  <n-descriptions
    {...attrs}
    bordered={true}
  >
    {props.list.map((item, index) => (
      <n-descriptions-item
        key={index}
        label={item.text}
        label-style={props.itemLabelStyle}
        content-style={props.itemContentStyle}
      >
        {
          item.render
            ? item.render(props.data, item.field)
            : props.data[item.field]
        }
      </n-descriptions-item>
    ))}
  </n-descriptions>
));
</script>

<style scoped></style>