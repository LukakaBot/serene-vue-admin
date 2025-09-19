<script setup lang="tsx">
import type { ButtonProps } from 'naive-ui'
import type { VNode } from 'vue'
import type { AppButtonProps } from './types'
import { NButton, NFlex } from 'naive-ui'
import { resolveDirective, withDirectives } from 'vue'
import { renderIcon } from '@/utils/tools/index'

interface Props {
  list: AppButtonProps[]
  onClick?: (label: string) => void
}

const props = defineProps<Props>()

function handleClick(label: string) {
  props.onClick?.(label)
}

function createButtonProps({ type, icon, text }: AppButtonProps): ButtonProps {
  return {
    type,
    renderIcon: icon ? () => renderIcon({ name: icon! }) : undefined,
    strong: true,
    onClick: () => handleClick(text),
  }
}

function withAuthDirective(vnode: VNode, value: string) {
  const vAuth = resolveDirective('auth')
  return withDirectives(vnode, [[vAuth, value]])
}

defineRender(() => {
  const { list } = props
  return (
    <NFlex>
      {list.map((btn) => {
        const buttonProps = createButtonProps(btn)
        const buttonRender = <NButton {...buttonProps}>{btn.text}</NButton>

        return btn.auth !== undefined
          ? withAuthDirective(buttonRender, btn.text)
          : buttonRender
      })}
    </NFlex>
  )
})
</script>
