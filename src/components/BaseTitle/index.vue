<script setup lang="tsx">
import type { BaseTitleProps } from './types'

const props = withDefaults(defineProps<BaseTitleProps>(), {
  title: '我是标题',
  titleStyle: () => ({}),
  showTag: true,
  tagDirection: 'bottom',
})

const tagClassName = computed(() =>
  props.showTag && props.tagDirection === 'left'
    ? 'left-tag-title'
    : 'bottom-tag-title',
)

defineRender(() => (
  <div class={tagClassName.value} style={props.titleStyle}>
    {props.title}
  </div>
))
</script>

<style scoped></style>
