<script setup lang="ts">
import { useLoading } from '@/hooks'
import { renderIcon } from '@/utils/tools'

const [loading, setLoading] = useLoading()

function handleClick() {
  setLoading(true)
  setTimeout(() => setLoading(false), 500)
}

function renderButtonIcon() {
  return renderIcon({ name: 'ion:cash-outline' })
}
</script>

<template>
  <n-card>
    <template #header>
      <TagTitle title="加载中" />
    </template>
    <n-space>
      <n-button
        :loading="loading"
        :render-icon="renderButtonIcon"
        @click="handleClick"
      >
        点我
      </n-button>
      <n-button :loading="loading" @click="handleClick">
        点我
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped></style>
