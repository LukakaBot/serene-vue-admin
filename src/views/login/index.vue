<script setup lang="tsx">
import LoginBox1 from './components/LoginBox1.vue'
import ToolBox from './components/ToolBox.vue'

defineRender(() => (
  <div class="relative h-100vh">
    <ToolBox />
    <LoginBox1 />
  </div>
))
</script>

<style scoped></style>
