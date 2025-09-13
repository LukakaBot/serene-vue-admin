<script setup lang="tsx">
interface Props {
  /** 验证码宽度 */
  width?: number
  /** 验证码高度 */
  height?: number
  /** 是否绘制线条 */
  drawLine?: boolean
  /** 是否绘制圆点 */
  drawPoint?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
  height: 50,
  drawLine: true,
  drawPoint: true,
})

const captcha = ref('')

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateRandomText() {
  const chars
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let text = ''
  for (let i = 0; i < 4; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return text
}

function generateRandomColor(min: number, max: number) {
  const r = generateRandomNumber(min, max)
  const g = generateRandomNumber(min, max)
  const b = generateRandomNumber(min, max)
  return `rgb(${r},${g},${b})`
}

function drawText(ctx: CanvasRenderingContext2D) {
  captcha.value = generateRandomText()
  captcha.value.split('').forEach((char, index) => {
    const fontSize = generateRandomNumber(18, 30)
    const deg = generateRandomNumber(-10, 10)

    ctx.fillStyle = generateRandomColor(50, 200)
    ctx.font = `${fontSize}px Arial`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = generateRandomColor(80, 150)
    ctx.save()
    ctx.translate(
      (props.width / 4) * index + 2.5,
      generateRandomNumber(-props.height / 4, props.height / 4),
    )
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(char, 0, props.height / 2)
    ctx.restore()
  })
}

function drawLine(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 5; i++) {
    ctx.beginPath()
    ctx.moveTo(
      generateRandomNumber(0, props.width),
      generateRandomNumber(0, props.height),
    )
    ctx.lineTo(
      generateRandomNumber(0, props.width),
      generateRandomNumber(0, props.height),
    )
    ctx.strokeStyle = generateRandomColor(150, 180)
    ctx.closePath()
    ctx.stroke()
  }
}

function drawPoint(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 40; i++) {
    ctx.beginPath()
    ctx.arc(
      generateRandomNumber(0, props.width),
      generateRandomNumber(0, props.height),
      1,
      0,
      2 * Math.PI,
    )
    ctx.fillStyle = generateRandomColor(150, 180)
    ctx.fill()
  }
}

function drawCaptcha() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.textBaseline = 'bottom'
  ctx.fillStyle = generateRandomColor(220, 255)
  ctx.fillRect(0, 0, props.width, props.height)

  drawText(ctx)

  if (props.drawLine)
    drawLine(ctx)
  if (props.drawPoint)
    drawPoint(ctx)
}

function init() {
  drawCaptcha()
}

function checkCaptcha(value: string) {
  return captcha.value.toLowerCase() === value.toLowerCase()
}

onMounted(() => init())

defineExpose({ checkCaptcha })

defineRender(() => (
  <canvas
    id="canvas"
    class="rounded"
    width={props.width}
    height={props.height}
    onClick={drawCaptcha}
  />
))
</script>

<style scoped></style>
