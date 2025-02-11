<script setup lang="tsx">
import type { VNode } from "vue";
import {
  NModalProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
} from "naive-ui";

interface Slots {
  default: VNode;
}

const slots = defineSlots<Slots>();

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
));
</script>

<style scoped></style>
