<script setup lang="tsx">
interface Props {
  prefix?: string
  suffix?: string
  size?: string
  showSeparator?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: '14px',
  showSeparator: true,
})

const attrs = useAttrs()

const bindStyle = computed(() => ({
  fontSize: props.size,
}))

const isRenderPrefix = computed(() => !!props.prefix)

const isRenderSuffix = computed(() => !!props.suffix)

defineRender(() => (
  <div style={bindStyle.value}>
    <span v-if={isRenderPrefix.value}>{props.prefix}</span>
    <n-number-animation {...attrs} showSeparator={props.showSeparator} />
    <span v-if={isRenderSuffix.value}>{props.suffix}</span>
  </div>
))
</script>

<style scoped></style>
