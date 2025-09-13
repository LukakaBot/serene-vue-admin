<script setup lang="ts">
import { renderIcon } from '@/utils/tools'

function renderButtonIcon() {
  return renderIcon({ name: 'ion:cash-outline' })
}
</script>

<template>
  <n-card>
    <template #header>
      <BaseTitle title="次要按钮" />
    </template>
    <n-space>
      <n-button strong secondary>
        Default
      </n-button>
      <n-button strong secondary type="tertiary">
        Tertiary
      </n-button>
      <n-button strong secondary type="primary">
        Primary
      </n-button>
      <n-button strong secondary type="info">
        Info
      </n-button>
      <n-button strong secondary type="success">
        Success
      </n-button>
      <n-button strong secondary type="warning">
        Warning
      </n-button>
      <n-button strong secondary type="error">
        Error
      </n-button>
      <n-button strong secondary round>
        Default
      </n-button>
      <n-button strong secondary round type="primary">
        Primary
      </n-button>
      <n-button strong secondary round type="info">
        Info
      </n-button>
      <n-button strong secondary round type="success">
        Success
      </n-button>
      <n-button strong secondary round type="warning">
        Warning
      </n-button>
      <n-button strong secondary round type="error">
        Error
      </n-button>
      <n-button strong secondary circle :render-icon="renderButtonIcon" />
      <n-button strong secondary circle type="primary" :render-icon="renderButtonIcon" />
      <n-button strong secondary circle type="info" :render-icon="renderButtonIcon" />
      <n-button strong secondary circle type="success" :render-icon="renderButtonIcon" />
      <n-button strong secondary circle type="warning" :render-icon="renderButtonIcon" />
      <n-button strong secondary circle type="error" :render-icon="renderButtonIcon" />
    </n-space>
  </n-card>
</template>

<style scoped></style>
