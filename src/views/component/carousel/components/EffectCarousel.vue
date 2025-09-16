<script setup lang="ts">
const effects = ['slide', 'fade', 'card']

const myEffect = ref<'slide' | 'fade' | 'card'>('slide')

const isCard = computed(() => myEffect.value === 'card')
</script>

<template>
  <n-card>
    <template #header>
      <TagTitle title="过渡效果" />
    </template>
    <template #default>
      <n-space vertical>
        <n-radio-group v-model:value="myEffect" style="margin-bottom: 10px">
          <n-radio-button
            v-for="effect in effects"
            :key="effect"
            :value="effect"
          >
            {{ effect }}
          </n-radio-button>
        </n-radio-group>
        <n-carousel
          :key="myEffect"
          :effect="myEffect"
          :centered-slides="isCard"
          :slides-per-view="isCard ? 'auto' : 1"
          draggable
          style="height: 240px"
        >
          <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            >
          </n-carousel-item>
          <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            >
          </n-carousel-item>
          <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
            >
          </n-carousel-item>
          <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
            >
          </n-carousel-item>
        </n-carousel>
      </n-space>
    </template>
  </n-card>
</template>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
