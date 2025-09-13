<script setup lang="tsx">
import LoginForm from './LoginForm.vue'
// import SvgImage from './SvgImage.vue';
import WaveSvg from './WaveSvg.vue'

defineRender(() => (
  <div>
    <WaveSvg />
    <div class="absolute left-50% top-50% rounded-3 -translate-50%">
      <LoginForm />
    </div>
  </div>
))
</script>

<style scoped></style>
