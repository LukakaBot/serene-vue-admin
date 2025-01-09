<script setup lang="tsx">
import type { CSSProperties } from 'vue';

type Props = {
  /** 标题 */
  title: string;
  /** 标题样式 */
  titleStyle?: CSSProperties;
  /** 是否显示 tag */
  showTag?: boolean;
  /** tag 方向 */
  tagDirection?: 'left' | 'bottom';
};

const props = withDefaults(
  defineProps<Props>(),
  {
    title: '我是标题',
    titleStyle: () => ({}),
    showTag: true,
    tagDirection: 'bottom',
  }
);

const tagClassName = computed(() => (
  props.tagDirection === 'left'
    ? 'left-tag-title'
    : 'bottom-tag-title'
));

defineRender(() => (
  <div
    class={tagClassName.value}
    style={props.titleStyle}
  >
    {props.title}
  </div>
));
</script>

<style scoped></style>