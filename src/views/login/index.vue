<script setup lang="tsx">
import LoginBox from './components/LoginBox.vue'
import ToolBox from './components/ToolBox.vue'

defineRender(() => (
  <div class="relative h-100vh">
    <ToolBox />
    <LoginBox />
  </div>
))
</script>

<style scoped></style>
