<script setup lang="ts">
import { useLoading } from '@/hooks'

const [loading, setLoading] = useLoading()

const iconList = [
  {
    icon: 'ep:user',
    size: 32,
    title: '用户',
    color: '#69c0ff',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'ep:data-analysis',
    size: 32,
    title: '分析',
    color: '#69c0ff',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'ep:goods',
    size: 32,
    title: '商品',
    color: '#ff9c6e',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'material-symbols:orders-outline-rounded',
    size: 32,
    title: '订单',
    color: '#b37feb',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'healthicons:bills',
    size: 32,
    title: '票据',
    color: '#ffd666',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'ep:message',
    size: 32,
    title: '消息',
    color: '#5cdbd3',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'ep:price-tag',
    size: 32,
    title: '标签',
    color: '#ff85c0',
    event: {
      click: () => {},
    },
  },
  {
    icon: 'ep:setting',
    size: 32,
    title: '配置',
    color: '#ffc069',
    event: {
      click: () => {},
    },
  },
]

function fetchData(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

async function getData() {
  try {
    setLoading(true)
    await fetchData()
  }
  finally {
    setLoading(false)
  }
}

function init() {
  getData()
}

onMounted(() => init())
</script>

<template>
  <div class="mb-4">
    <n-grid
      cols="1 s:2 m:3 l:8 xl:8 2xl:8"
      responsive="screen"
      :x-gap="16"
      :y-gap="8"
    >
      <n-grid-item v-for="(item, index) in iconList" :key="index">
        <NCard content-style="padding-top: 0;" size="small" :bordered="false">
          <template #footer>
            <n-skeleton v-if="loading" size="medium" />
            <div v-else class="cursor-pointer">
              <p class="flex justify-center">
                <span>
                  <BaseIcon
                    :name="item.icon"
                    :color="item.color"
                    :size="item.size"
                  />
                </span>
              </p>
              <p class="flex justify-center">
                <span>{{ item.title }}</span>
              </p>
            </div>
          </template>
        </NCard>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped></style>
