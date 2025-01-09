<template>
  <canvas id='canvas' ref="canvasRef" :width="width" :height="height" @click="drawCaptcha" />
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';

type Props = {
  /** 验证码宽度 */
  width?: number,
  /** 验证码高度 */
  height?: number,
  /** 是否绘制线条 */
  drawLine?: boolean,
  /** 是否绘制圆点 */
  drawPoint?: boolean,
};

withDefaults(
  defineProps<Props>(),
  {
    width: 100,
    height: 50,
    drawLine: true,
    drawPoint: true,
  }
);

const themeVars = useThemeVars();

const canvasRef = ref<HTMLCanvasElement>();

function checkCaptcha(value: string) {
  console.log(value);
  return true;
}

function drawCaptcha() {

}

function init() {
  drawCaptcha();
  console.log(themeVars.value);
}

onMounted(() => init());

defineExpose({ checkCaptcha });
</script>

<style scoped></style>