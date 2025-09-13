<script setup lang="tsx">
import type { BaseProviderSlots } from './types'
import {
  NDialogProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
} from 'naive-ui'

const slots = defineSlots<BaseProviderSlots>()

defineRender(() => (
  <NModalProvider>
    <NDialogProvider>
      <NMessageProvider>
        <NNotificationProvider>
          {{ default: slots.default }}
        </NNotificationProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NModalProvider>
))
</script>

<style scoped></style>
