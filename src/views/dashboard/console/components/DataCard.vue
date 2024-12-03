<template>
  <div class="mb-10px">
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item>
        <n-card title="访问量" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="success">日</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <NumberAnimation :from="1" :to="visits.dayVisits" size="30px" v-else />
          </div>
          <div class="flex justify-between px-1 py-1">
            <div class="flex items-center gap-x-4px">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <NumberAnimation :from="1" :to="visits.rise" suffix="%" />
                <BaseIcon name="ep:caret-top" color="#00ff6f" :size="14" />
              </template>
            </div>
            <div class="flex items-center gap-x-4px">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                周同比
                <NumberAnimation :from="1" :to="visits.decline" suffix="%" />
                <BaseIcon name="ep:caret-bottom" color="#ffde66" :size="14" />
              </template>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" text :repeat="2" />
              <template v-else>
                <div class="flex items-center gap-x-4px"> 总访问量： </div>
                <div class="flex items-center gap-x-4px">
                  <NumberAnimation :from="1" :to="visits.amount" />
                </div>
              </template>
            </div>
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="销售额" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="info">周</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <NumberAnimation :from="1" :to="saleroom.weekSaleroom" size="30px" prefix="￥" v-else />
          </div>
          <div class="flex justify-between px-2 py-2">
            <div class="flex-1 flex items-center gap-x-4px">
              <n-progress type="line" :percentage="saleroom.degree" :indicator-placement="'inside'" processing />
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="flex items-center gap-x-4px"> 总销售额： </div>
                <div class="flex items-center gap-x-4px">
                  <NumberAnimation :from="1" :to="saleroom.amount" prefix="￥" />
                </div>
              </template>
            </div>
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="订单量" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="warning">周</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <NumberAnimation :from="1" :to="orderLarge.weekLarge" size="30px" v-else />
          </div>
          <div class="flex justify-between px-1 py-1">
            <div class="flex items-center gap-x-4px">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <NumberAnimation :from="1" :to="orderLarge.rise" suffix="%" />
                <BaseIcon name="ep:caret-top" color="#00ff6f" :size="14" />
              </template>
            </div>
            <div class="flex items-center gap-x-4px">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                周同比
                <NumberAnimation :from="1" :to="orderLarge.decline" suffix="%" />
                <BaseIcon name="ep:caret-bottom" color="#ffde66" :size="14" />
              </template>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="flex items-center gap-x-4px"> 转化率： </div>
                <div class="flex items-center gap-x-4px">
                  <NumberAnimation :from="1" :to="orderLarge.amount" suffix="%" />
                </div>
              </template>
            </div>
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="成交额" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
          <template #header-extra>
            <n-tag type="error">月</n-tag>
          </template>
          <div class="flex justify-between px-1 py-1">
            <n-skeleton v-if="loading" :width="100" size="medium" />
            <NumberAnimation :from="1" :to="volume.weekLarge" size="30px" prefix="￥" v-else />
          </div>
          <div class="flex justify-between px-1 py-1">
            <div class="flex items-center gap-x-4px">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                日同比
                <NumberAnimation :from="1" :to="volume.rise" suffix="%" />
                <BaseIcon name="ep:caret-top" color="#00ff6f" :size="14" />
              </template>
            </div>
            <div class="flex items-center gap-x-4px">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                月同比
                <NumberAnimation :from="1" :to="volume.decline" suffix="%" />
                <BaseIcon name="ep:caret-bottom" color="#ffde66" :size="14" />
              </template>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <template v-else>
                <div class="flex items-center gap-x-4px"> 总成交额： </div>
                <div class="flex items-center gap-x-4px">
                  <NumberAnimation :from="1" :to="volume.amount" prefix="￥" />
                </div>
              </template>
            </div>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '@/hooks/useLoading';
import type { DataCardItem } from '../types';

const [loading, setLoading] = useLoading();

const visits = ref<any>({});

const saleroom = ref<any>({});

const orderLarge = ref<any>({});

const volume = ref<any>({});

function fetchData(): Promise<DataCardItem> {
  const data = {
    visits: { dayVisits: 21643, rise: 45, decline: 98, amount: 819801 },
    saleroom: { weekSaleroom: 21643, degree: 45, amount: 819801 },
    orderLarge: { weekLarge: 15493, rise: 45, decline: 64, amount: 819801 },
    volume: { weekLarge: 22488, rise: 72, decline: 38, amount: 939077 },
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

async function getData() {
  try {
    setLoading(true);
    const data = await fetchData();
    visits.value = data.visits;
    saleroom.value = data.saleroom;
    orderLarge.value = data.orderLarge;
    volume.value = data.volume;
  } finally {
    setLoading(false);
  }
}

function init() {
  getData();
}

onMounted(() => init());
</script>

<style scoped></style>