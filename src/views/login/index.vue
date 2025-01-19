<script setup lang="tsx">
import ToolBox from "./components/ToolBox.vue";
import LoginBox1 from "./components/LoginBox1.vue";

defineRender(() => (
  <div class="h-100vh relative">
    <ToolBox />
    <LoginBox1 />
  </div>
));
</script>

<style scoped></style>
