<template>
  <n-layout-header class="px-20px py-10px text-right">
    <n-space size="large">
      <n-switch v-model="isDark" @update:value="handleUpdateSwitch">
        <template #checked> dark </template>
        <template #unchecked> light </template>
      </n-switch>

      <n-popover position="bottom" trigger="click">
        <n-avatar :style="{ backgroundColor: '#14a9f8' }">Arco</n-avatar>
        <template #content>
          <p>Here is the text content</p>
          <p>Here is the text content</p>
        </template>
      </n-popover>
    </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
const isDark = ref(false);

function handleUpdateSwitch(value: boolean) {
  value ? document.body.setAttribute('arco-theme', 'dark') : document.body.removeAttribute('arco-theme');
}
</script>

<style scoped></style>