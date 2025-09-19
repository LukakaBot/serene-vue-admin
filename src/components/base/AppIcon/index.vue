<script setup lang="tsx">
import type { AppIconProps } from './types'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<AppIconProps>(), {
  color: 'currentColor',
  size: 16,
})

const isLocalIcon = computed(() => props.name.startsWith('icon-'))

const iconName = computed(() => `#svg-${props.name}`)

const iconStyle = computed(() => ({
  color: props.color,
}))

defineRender(() => {
  const { name, color, size } = props
  return isLocalIcon.value
    ? (
        <svg style={iconStyle.value} width={size} height={size} aria-hidden="true">
          <use xlinkHref={iconName.value} fill={color} />
        </svg>
      )
    : (
        <Icon icon={name} width={size} height={size} color={color} />
      )
})
</script>

<style scoped></style>
