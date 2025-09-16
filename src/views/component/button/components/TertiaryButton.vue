<script setup lang="ts">
import { renderIcon } from '@/utils/tools'

function renderButtonIcon() {
  return renderIcon({ name: 'ion:cash-outline' })
}
</script>

<template>
  <n-card>
    <template #header>
      <TagTitle title="次次要按钮" />
    </template>
    <n-space>
      <n-button strong tertiary>
        Default
      </n-button>
      <n-button strong tertiary type="tertiary">
        Tertiary
      </n-button>
      <n-button strong tertiary type="primary">
        Primary
      </n-button>
      <n-button strong tertiary type="info">
        Info
      </n-button>
      <n-button strong tertiary type="success">
        Success
      </n-button>
      <n-button strong tertiary type="warning">
        Warning
      </n-button>
      <n-button strong tertiary type="error">
        Error
      </n-button>
      <n-button strong tertiary round>
        Default
      </n-button>
      <n-button strong tertiary round type="primary">
        Primary
      </n-button>
      <n-button strong tertiary round type="info">
        Info
      </n-button>
      <n-button strong tertiary round type="success">
        Success
      </n-button>
      <n-button strong tertiary round type="warning">
        Warning
      </n-button>
      <n-button strong tertiary round type="error">
        Error
      </n-button>
      <n-button strong tertiary circle :render-icon="renderButtonIcon" />
      <n-button
        strong
        tertiary
        circle
        type="primary"
        :render-icon="renderButtonIcon"
      />
      <n-button
        strong
        tertiary
        circle
        type="info"
        :render-icon="renderButtonIcon"
      />
      <n-button
        strong
        tertiary
        circle
        type="success"
        :render-icon="renderButtonIcon"
      />
      <n-button
        strong
        tertiary
        circle
        type="warning"
        :render-icon="renderButtonIcon"
      />
      <n-button
        strong
        tertiary
        circle
        type="error"
        :render-icon="renderButtonIcon"
      />
    </n-space>
  </n-card>
</template>

<style scoped></style>
